import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.type";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (data: JWTPayload) => {
  return jwt.sign(
    {
      jti: crypto.randomUUID(), // Tạo một UUID ngẫu nhiên để làm jti (JWT ID) ví dụ: "550e8400-e29b-41d4-a716-446655440000" or "550e8400-e29b-41d4-a716-446655440000"
      ...data,
    },
    JWT_SECRET as string,
    {
      expiresIn: JWT_EXPIRES_IN as unknown as number,
    },
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

export const generateRefreshToken = (data: JWTPayload) => {
  return jwt.sign(
    {
      jti: crypto.randomUUID(),
      ...data,
    },
    JWT_REFRESH_SECRET as string,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN as unknown as number,
    },
  );
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET as string);

    if (typeof decoded === "string") {
      return false;
    }

    return decoded as JWTPayload;
  } catch {
    return false;
  }
};
