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
  async tagVersion(tagName: string) {
    const versionKey = `tag:${tagName}:version`;
    let version = await redis.get(versionKey);

    if (!version) {
      version = "1";
      await redis.set(versionKey, version);
    }

    return version;
  },
  async invalidateTagVersion(tagName: string) {
    const versionKey = `tag:${tagName}:version`;
    const newVersion = await redis.incr(versionKey);

    return newVersion;
  },
  async getOrSetWithTag<T>(
    key: string,
    fetchFn: () => Promise<T>,
    tags: string[],
    ttl: number = 3600,
  ): Promise<T> {
    // multi (transaction)
    const multi = redis.multi();

    // kiểm tra key có tồn tại trong cache không
    const cacheData = await redis.get(key);
    if (cacheData) {
      return JSON.parse(cacheData) as T;
    }

    // Lưu dữ liệu chính
    const freshData = await fetchFn();

    if (freshData) {
      // Lưu dữ liệu chính
      multi.set(key, JSON.stringify(freshData), {
        EX: ttl,
      });

      // maps tag
      const tagName = `tag:${tags.join(":")}`;
      multi.sAdd(tagName, key);
      multi.expire(tagName, ttl);

      await multi.exec();
    }

    return freshData;
  },
  async invalidateTags(tags: string[]) {
    const prefix = `tag:${tags.join(":")}`;
    const allKeystoDelete = new Set();

    // 1. Tìm tất cả các tag keys bắt đầu bằng prefix
    // Triển khai: Dùng scan
    let cursor = "0";
    do {
      const reply = await redis.scan(cursor, {
        MATCH: `${prefix}*`,
        COUNT: 100,
      });
      // trả về một mảng [cursor, keys] trong đó cursor là con trỏ mới và keys là danh sách các key tìm được
      // cursor là "0" khi đã quét hết tất cả các key, nếu không thì trả về con trỏ mới để tiếp tục quét

      cursor = reply.cursor;
      const foundTags = reply.keys;

      // 2. Tag tìm được, lấy danh sách thành viên của từng tag rồi xóa tất cả các key thành viên đó và xóa luôn tag key
      for (const tagName of foundTags) {
        const memberKeys = await redis.sMembers(tagName);
        memberKeys.forEach((key) => {
          allKeystoDelete.add(key);
        });

        allKeystoDelete.add(tagName);
      }
    } while (cursor !== "0");

    if (allKeystoDelete.size > 0) {
      await redis.unlink(Array.from(allKeystoDelete) as string[]); // unlink: xóa nhiều key cùng lúc, không chặn event loop
    }
  },
};

// ['user', 1]
// Invalidate: ['user'] => xóa tất cả các key có tag 'user' (user:1, user:2, user:list, ...)
// ['user', 1] => chỉ xóa user 1
