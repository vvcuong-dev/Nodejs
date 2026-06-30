import { ConfirmChannel, Replies } from "amqplib";
import { rabbitConfig } from "../configs/rabbit.config";
import amqp, {
  AmqpConnectionManager,
  ChannelWrapper,
} from "amqp-connection-manager";

type RabbitMQClient = {
  getInstance: () => RabbitMQClient;
  connection: AmqpConnectionManager | null;
  createChannel: (
    name: string,
    setup: (channel: ConfirmChannel) => Promise<Replies.AssertQueue>,
  ) => ChannelWrapper | undefined;
};

export const rabbitmqClient: RabbitMQClient = {
  connection: null,
  getInstance() {
    const url = `amqp://${rabbitConfig.username}:${rabbitConfig.password}@${rabbitConfig.host}:${rabbitConfig.port}`;

    if (!this.connection) {
      this.connection = amqp.connect([url]);

      this.connection.on("connect", () => {
        console.log("Connected to RabbitMQ");
      });
      this.connection.on("disconnect", () => {
        console.error("Disconnected from RabbitMQ");
      });
    }

    return this;
  },

  createChannel(name, setup) {
    return this.connection?.createChannel({
      name,
      setup,
    });
  },
};
