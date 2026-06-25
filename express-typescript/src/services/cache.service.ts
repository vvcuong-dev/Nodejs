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
  async delete(key: string): Promise<void> {
    await redis.del(key);
  },
  async deleteByPattern(pattern: string): Promise<void> {
    const keys = redis.scanIterator({
      TYPE: "string",
      MATCH: pattern,
    });

    // (giải thích: redis.scanIterator trả về một async iterator, vì vậy chúng ta có thể sử dụng vòng lặp for-await-of để lặp qua các khóa)

    for await (const key of keys) {
      await redis.del(key);
    }
  },
};
