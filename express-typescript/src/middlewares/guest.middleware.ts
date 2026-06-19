import { NextFunction, Request, Response } from "express";

export const guestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAuth = false;

  if (isAuth) {
    return res.redirect("/admin"); // chuyển hướng đến trang chủ nếu đã xác thực
  }

  next();
};

// khi redirect phải chú ý đường dẫn phải có dấu / ở đầu, nếu không sẽ bị lỗi khi redirect từ các trang con như /admin/users sẽ redirect đến /admin/auth/login thay vì /auth/login
