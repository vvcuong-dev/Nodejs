import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAuth = req.session.user;

  if (!isAuth) {
    if (req.baseUrl.startsWith("/api")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.redirect("/auth/login");
  }

  const user = await authService.profile(req.session.user?.id as number);
  if (user) {
    req.user = user;
  }

  next();
};

// khi redirect phải chú ý đường dẫn phải có dấu / ở đầu, nếu không sẽ bị lỗi khi redirect từ các trang con như /admin/users sẽ redirect đến /admin/auth/login thay vì /auth/login
