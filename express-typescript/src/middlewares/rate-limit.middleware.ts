import { Request, Response, NextFunction } from "express";
import { redisClient } from "../utils/redis";
import { errorResponse } from "../utils/response";

const redis = redisClient.getInstance();

const WINDOWMS = 60000; // 1 phút
const MAX_REQUESTS = 10;
export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Thuật toán Sliding Window Log
  const ip = req.ip;
  const key = `rateLimit:zset:${ip}`;
  const requestId = Math.random().toString(36).substring(7);
  const now = Date.now();

  // 1. Dọn dẹp (xóa bỏ quá khứ)
  // 2: Đếm (kiểm tra thực tế)

  const [, currentCount] = (await redis
    .multi() // multi() để thực hiện nhiều lệnh Redis trong một transaction
    .zRemRangeByScore(key, 0, now - WINDOWMS) // xóa các request đã quá hạn (trong vòng 60 giây gần nhất)
    .zCard(key) // đếm số lượng request hiện tại trong 60 giây gần nhất
    .exec()) as [unknown, number]; // exec() để thực hiện transaction và nhận kết quả

  // 3. Quyết định (chặn hay cho)
  if (currentCount < MAX_REQUESTS) {
    // 4. Ghi nhận (lưu vết)
    await redis
      .multi()
      .zAdd(key, { score: now, value: `${now}:${requestId}` }) // thêm request hiện tại vào ZSET
      .expire(key, WINDOWMS / 1000) // đặt TTL cho key là 60 giây
      .exec();
  } else {
    return errorResponse(res, "Too many requests", 429);
  }

  next();
};

// zRemRangeByScore là một lệnh Redis được sử dụng để xóa các phần tử trong một tập hợp có thứ tự (sorted set) dựa trên điểm số (score) của chúng. Cụ thể, lệnh này sẽ xóa tất cả các phần tử có điểm số nằm trong khoảng từ giá trị tối thiểu đến giá trị tối đa mà bạn chỉ định.

// ví dụ: zRemRangeByScore key min max
