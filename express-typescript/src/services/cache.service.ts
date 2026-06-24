import { redisClient } from "../utils/redis";

const redis = redisClient.getInstance();

export const cacheService = {
  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 3600,
  ): Promise<T> {
    const cacheData = await redis.get(key);

    if (cacheData) {
      return JSON.parse(cacheData) as T;
    }

    const freshData = await fetchFn();

    if (freshData) {
      await redis.set(key, JSON.stringify(freshData), {
        EX: ttl,
      });
    }

    return freshData;
  },
};
