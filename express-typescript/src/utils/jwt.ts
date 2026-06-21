import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.type";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (data: JWTPayload) => {
  return jwt.sign(data, JWT_SECRET as string);
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
