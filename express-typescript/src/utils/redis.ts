import { createClient, RedisClientType } from "redis";
import { redsisConfig } from "../configs/redis.config";

type RedisClient = {
  client: RedisClientType | null;
  getInstance: () => RedisClientType;
};

export const redisClient: RedisClient = {
  client: null,

  getInstance() {
    const url = `redis://${redsisConfig.host}:${redsisConfig.port}`;

    if (!this.client) {
      this.client = createClient({
        url: url,
      });

      this.client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      this.client.connect().then(() => {
        console.log("Connected to Redis");
      });
    }

    return this.client;
  },
};

type ReidsPubSub = {
  pubClient: RedisClientType | null;
  subClient: RedisClientType | null;
  getInstance: () => ReidsPubSub;
};

export const pubSubRedis: ReidsPubSub = {
  pubClient: null,
  subClient: null,

  getInstance() {
    const url = `redis://${redsisConfig.host}:${redsisConfig.port}`;

    if (!this.pubClient) {
      this.pubClient = createClient({
        url: url,
      });

      this.pubClient.on("error", (err) => {
        console.error("Redis Pub Client Error", err);
      });

      this.pubClient.connect().then(() => {
        console.log("Connected to Redis Pub Client");
      });
    }

    if (!this.subClient) {
      this.subClient = createClient({
        url: url,
      });

      this.subClient.on("error", (err) => {
        console.error("Redis Sub Client Error", err);
      });

      this.subClient.connect().then(() => {
        console.log("Connected to Redis Sub Client");
      });
    }

    return this;
  },
};
