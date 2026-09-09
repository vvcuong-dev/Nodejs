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
  //X-Forwarded-For là địa chỉ IP của client khi request đi qua proxy hoặc load balancer. (khi deploy trên server, nếu không có proxy hoặc load balancer thì req.ip sẽ trả về địa chỉ IP của client trực tiếp)

  // Kiểm tra số lượng request hiện tại
  const requestNumber = await redis.get(`rateLimit:${ip}`);

  if (requestNumber && parseInt(requestNumber) > MAX_REQUESTS) {
    // Kiểm tra thời gian hiện tại với thời gian bắt đầu xem có lớn hon 1 phút không
    const now = Math.floor(Date.now() / 1000);
    const firstTimeRequest = parseInt(
      (await redis.get(`rateLimitTime:${ip}`)) || "0",
    );
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

  // Cập nhật rate limit
  const count = await redis.incr(`rateLimit:${ip}`);
  if (count === 1) {
    await redis.set(`rateLimitTime:${ip}`, Math.floor(Date.now() / 1000));
  }
  next();
};
