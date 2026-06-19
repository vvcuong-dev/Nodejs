import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAuth = false;

  if (!isAuth) {
    if (req.baseUrl.startsWith("/api")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.redirect("/auth/login"); // chuyển hướng đến trang đăng nhập nếu chưa xác thực
  }

  next();
};

// khi redirect phải chú ý đường dẫn phải có dấu / ở đầu, nếu không sẽ bị lỗi khi redirect từ các trang con như /admin/users sẽ redirect đến /admin/auth/login thay vì /auth/login
