import { rabbitmqClient } from "../utils/rabbitmq";
const rabbitmq = rabbitmqClient.getInstance();

const channelWrapper = rabbitmq.getOrCreateChannel(
  "Task Channel",
  (channel) => {
    return channel.assertQueue("Worker Task Channel", { durable: true });
  },
);

const taskConsumer = async () => {
  channelWrapper?.consume("task-queue", (msg) => {
    if (msg) {
      const task = msg.content.toString();
      console.log("Received task:", task);
      channelWrapper?.ack(msg);
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
