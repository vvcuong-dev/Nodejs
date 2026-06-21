import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.type";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (data: JWTPayload) => {
  return jwt.sign(
    {
      jti: crypto.randomUUID(), // Tạo một UUID ngẫu nhiên để làm jti (JWT ID) ví dụ: "550e8400-e29b-41d4-a716-446655440000" or "550e8400-e29b-41d4-a716-446655440000"
      ...data,
    },
    JWT_SECRET as string,
  );
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (typeof decoded === "string") {
      return false;
    }

    return decoded as JWTPayload;
  } catch {
    return false;
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
