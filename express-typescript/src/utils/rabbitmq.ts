import amqp, { Channel, ChannelModel } from "amqplib";
import { rabbitConfig } from "../configs/rabbit.config";

type RabbitMQClient = {
  connection: Promise<ChannelModel | void> | null; // thêm void là bởi vì amqp.connect có thể trả về void nếu kết nối thất bại
  channel: Channel | null;
  getInstance: () => RabbitMQClient;
};

export const rabbitmqClient: RabbitMQClient = {
  connection: null,
  channel: null,
  getInstance() {
    const url = `amqp://${rabbitConfig.username}:${rabbitConfig.password}@${rabbitConfig.host}:${rabbitConfig.port}`;
    if (!this.connection) {
      this.connection = amqp.connect(url).then(async (conn) => {
        if (conn) {
          this.channel = await conn.createChannel();
        }

        console.log("RabbitMQ connection established");
      });
    }

    return this;
  },
};
