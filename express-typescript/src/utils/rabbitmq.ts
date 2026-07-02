import { ConfirmChannel } from "amqplib";
import { rabbitConfig } from "../configs/rabbit.config";
import amqp, {
  AmqpConnectionManager,
  ChannelWrapper,
} from "amqp-connection-manager";

type RabbitMQClient = {
  getInstance: () => RabbitMQClient;
  connection: AmqpConnectionManager | null;
  channels: Map<string, ChannelWrapper>;
  getOrCreateChannel: (
    name: string,
    setup: (channel: ConfirmChannel) => Promise<void>,
  ) => ChannelWrapper | undefined;
};

export const rabbitmqClient: RabbitMQClient = {
  connection: null,
  channels: new Map(),
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

  getOrCreateChannel(name, setup) {
    if (this.channels.has(name)) {
      // channels.has(name) kiểm tra xem channel đã tồn tại chưa? nếu có trả về true, nếu chưa có trả về false
      return this.channels.get(name);
    }

    const channelWrapper = this.connection?.createChannel({
      name,
      setup,
    });

    if (channelWrapper) {
      this.channels.set(name, channelWrapper);
    }

    return channelWrapper;
  },
};
