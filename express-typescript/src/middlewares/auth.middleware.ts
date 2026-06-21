import { NextFunction, Request, Response } from "express";
import { apiAuthService } from "../services/api/auth.service";
import { decodeToken } from "../utils/jwt";
import { JWTPayload } from "../types/auth.type";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.baseUrl.startsWith("/api")) {
    const isAuth = req.user;
    if (!isAuth) {
      return res.redirect("/auth/login");
    }
  }

  // Xử lý API
  const token = req.headers["authorization"]?.split(" ").slice(-1).join();
  const user = await apiAuthService.getProfile(token as string);

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decoded = decodeToken(token as string);
  req.user = user;
  req.jti = (decoded as JWTPayload & { jti: string })?.jti;

  next();
};

// khi redirect phải chú ý đường dẫn phải có dấu / ở đầu, nếu không sẽ bị lỗi khi redirect từ các trang con như /admin/users sẽ redirect đến /admin/auth/login thay vì /auth/login

// slice(-1) mặc định sẽ lấy phần tử cuối cùng của mảng

// VD: "Bearer token" => ["Bearer", "token"] => slice(-1) => ["token"] => join() => "token"
