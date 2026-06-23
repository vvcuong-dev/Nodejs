import { createClient, RedisClientType } from "redis";

type RedisClient = {
  client: RedisClientType | null;
  instance: RedisClientType | null;
  getInstance: () => RedisClientType;
};

export const redisClient: RedisClient = {
  instance: null,
  client: null,

  getInstance() {
    const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

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
