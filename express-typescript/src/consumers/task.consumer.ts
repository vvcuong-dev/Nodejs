import { ConfirmChannel, ConsumeMessage } from "amqplib";
import { rabbitmqClient } from "../utils/rabbitmq";

const taskConsumer = {
  // method xử lý công việc nhận message từ queue

  onOrderCreated(channel: ConfirmChannel, msg: ConsumeMessage | null) {
    // logic
    if (!msg) {
      return;
    }

    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`Đang xử lý message:`, content);
      channel.ack(msg); // xác nhận đã xử lý xong message, nếu không ack thì message sẽ được gửi lại cho consumer khác
    } catch (error) {
      console.error("Lỗi khi xử lý message:", error);
      channel.nack(msg, false, false); // từ chối message, không gửi lại cho consumer khác
    }
  },

  // onOrderCancelled(channel: ConfirmChannel, msg: ConsumeMessage | null) {
  //   // logic
  // },

  async setup() {
    const rabbitmq = rabbitmqClient.getInstance();
    rabbitmq.getOrCreateChannel(
      "TASK_CONSUMER",
      async (channel: ConfirmChannel) => {
        channel.prefetch(1); // Giới hạn số lượng message được gửi đến consumer cùng lúc

        await channel.assertQueue("task-queue", { durable: true });
        await channel.consume("task-queue", async (msg) => {
          await this.onOrderCreated(channel, msg); // consume message từ queue và xử lý logic trong callback
        });

        // await channel.assertQueue("task-queue-2", { durable: true });
        // await channel.consume("task-queue-2", async (msg) => {
        //   await this.onOrderCancelled(channel, msg);
        // });
      },
    );
  },
};

taskConsumer.setup(); // gọi method setup để thiết lập consumer và bắt đầu nhận message từ queue
