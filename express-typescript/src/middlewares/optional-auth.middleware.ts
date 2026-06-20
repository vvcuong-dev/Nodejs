import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.user = null;

  if (req.session.user) {
    const userId = req.session.user.id;
    const user = await authService.profile(userId);

    if (user) {
      req.user = user;
      res.locals.user = user; // Đặt user vào res.locals để có thể sử dụng trong view
    }
  }

  next();
};
