import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.type";
import { jwtConfig } from "../configs/jwt.config";

export const generateToken = (data: JWTPayload) => {
  return jwt.sign(
    {
      jti: crypto.randomUUID(), // Tạo một UUID ngẫu nhiên để làm jti (JWT ID) ví dụ: "550e8400-e29b-41d4-a716-446655440000" or "550e8400-e29b-41d4-a716-446655440000"
      ...data,
    },
    jwtConfig.jwtSecret as string,
    {
      expiresIn: jwtConfig.expiresIn as unknown as number,
    },
  );
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.jwtSecret as string);

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
    jwtConfig.refreshSecret as string,
    {
      expiresIn: jwtConfig.refreshExpiresIn as unknown as number,
    },
  );
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.refreshSecret as string);

    if (typeof decoded === "string") {
      return false;
    }

    return decoded as JWTPayload;
  } catch {
    return false;
  }
};
