import { ConfirmChannel } from "amqplib";
import { rabbitmqClient } from "../utils/rabbitmq";
const rabbitmq = rabbitmqClient.getInstance();

const channelWrapper = rabbitmq.getOrCreateChannel(
  "TASK_CONSUMER",
  (channel: ConfirmChannel) => {
    channel.prefetch(1); // Giới hạn số lượng message mà consumer có thể nhận cùng lúc, ở đây là 1
    return channel.assertQueue("task-queue", { durable: true });
  },
);

const taskConsumer = async () => {
  channelWrapper?.consume("task-queue", (msg) => {
    if (msg) {
      const task = msg.content.toString();
      console.log("Đã nhận message task:", task);
      setTimeout(() => {
        channelWrapper?.ack(msg); // Xác nhận đã xử lý xong message
        console.log("Đã hoàn thành task:", task);
      }, 2000); // Giả lập thời gian xử lý task là 1 giây
    }
    // nghĩa là xác nhận đã nhận được message và xử lý xong, nếu không ack thì message sẽ bị giữ lại
    // trong queue và sẽ được gửi lại cho consumer khác hoặc chính consumer này nếu nó vẫn còn sống
  });
};

channelWrapper?.on("connect", () => {
  console.log("Connected to RabbitMQ channel hehe", channelWrapper?.name);
});

channelWrapper?.on("error", (err) => {
  console.error("RabbitMQ channel error:", err);
});

taskConsumer().catch((error) => {
  console.error("Error in task consumer:", error);
});
