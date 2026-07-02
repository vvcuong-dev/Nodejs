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

let count = 0;
const taskConsumer = async () => {
  channelWrapper?.consume("task-queue", (msg) => {
    if (msg) {
      const { value } = JSON.parse(msg.content.toString());
      console.log("Đã nhận message task:", value);
      setTimeout(() => {
        if (value !== "admin@gmail.com") {
          channelWrapper?.ack(msg); // Xác nhận đã xử lý xong message
          console.log("Đã hoàn thành task:", value);
        } else {
          if (count < 1) {
            channelWrapper?.nack(msg, false, true); // Xác nhận không xử lý xong message và yêu cầu gửi lại message
            console.log(
              "Xử lý message task thất bại, yêu cầu gửi lại vào queue:",
              value,
            );
          } else {
            channelWrapper?.nack(msg, false, false); // Xác nhận không xử lý xong message và không yêu cầu gửi lại message
            console.log("Đã từ chối message task:", value);
          }
          count++;
        }
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
