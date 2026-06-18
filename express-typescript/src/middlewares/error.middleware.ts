import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../types/error.type";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error: ErrorWithStatus = new Error("Not found path");
  error.status = 404;

  next(error);
};

export const errorHandlerLingMiddleware = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let message = err instanceof Error ? err.message : err;
  if (process.env.NODE_ENV === "production") {
    message = "";
  }

  const status = err.status || 500;

  if (req.url.startsWith("/api")) {
    return res.status(status).json({
      success: false,
      status: status,
      message: message || "Internal Server Error",
    });
  } else {
    return res.render("errors/errors", {
      message: message || "Internal Server Error",
      status: status,
      layout: false,
    });
  }
};

// errorHandlerLingMiddleware sẽ bắt lỗi từ notFoundMiddleware và các lỗi khác trong quá trình xử lý request, sau đó trả về response với thông tin lỗi.

// notFoundMiddleware sẽ được gọi khi không tìm thấy route nào phù hợp với request, nó sẽ tạo ra một lỗi với status 404 và truyền lỗi đó đến errorHandlerLingMiddleware để xử lý.
