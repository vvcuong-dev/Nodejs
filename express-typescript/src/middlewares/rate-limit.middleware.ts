import { Request, Response, NextFunction } from "express";
import { redisClient } from "../utils/redis";
import { errorResponse } from "../utils/response";

const redis = redisClient.getInstance();

const MAX_REQUESTS = 10;
export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ip = req.ip;

  // Tăng bộ đếm
  const count = await redis.incr(`rateLimit:${ip}`);
  console.log(`Request count for IP ${ip}: ${count}`);

  if (count === 1) {
    // Cap nhat thoi gian bat dau request lan dau tien
    await redis.set(`rateLimitTime:${ip}`, Math.floor(Date.now() / 1000));
  }

  // tăng thời gian block
  if (count === 20) {
    await redis.set(`rateLimitTime:${ip}`, Math.floor(Date.now() / 1000));
  }

  //X-Forwarded-For là địa chỉ IP của client khi request đi qua proxy hoặc load balancer. (khi deploy trên server, nếu không có proxy hoặc load balancer thì req.ip sẽ trả về địa chỉ IP của client trực tiếp)

  if (count > MAX_REQUESTS) {
    // Kiểm tra thời gian hiện tại với thời gian bắt đầu xem có lớn hon 1 phút không
    const now = Math.floor(Date.now() / 1000);
    const firstTimeRequest = parseInt(
      (await redis.get(`rateLimitTime:${ip}`)) || "0",
    );

    console.log(`First request time for IP ${ip}: ${firstTimeRequest}`);
    const ttl = now - firstTimeRequest;
    if (ttl < 60) {
      return errorResponse(
        res,
        "Too many requests. Please try again later.",
        429,
      );
    } else {
      // Nếu đã quá 1 phút thì reset lại số lượng request và thời gian bắt đầu
      await redis.del(`rateLimit:${ip}`);
      await redis.del(`rateLimitTime:${ip}`);
    }
  }

  next();
};
