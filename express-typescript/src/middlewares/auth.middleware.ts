import { NextFunction, Request, Response } from "express";
import { apiAuthService } from "../services/api/auth.service";

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

  req.user = user;
  req.token = token as string;

  next();
};
