import { prisma } from "../../libs/prisma";
import { JWTPayload, LoginData } from "../../types/auth.type";
import { verifyPassword } from "../../utils/hash";
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../../utils/jwt";

export const apiAuthService = {
  login: async (data: LoginData) => {
    const { email, password } = data;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return false;
    }

    const hashPassword = user.password;
    if (!verifyPassword(password, hashPassword)) {
      return false;
    }

    // Tạo token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // tạo refresh token trong database
    const decodeRefreshToken = decodeToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        jti: (decodeRefreshToken as { jti: string })?.jti as string,
        ttl: new Date(
          (decodeRefreshToken as JWTPayload & { exp: number })?.exp * 1000,
        ),
      },
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
  },
  getProfile: async (token: string) => {
    const decoded = verifyToken(token);

    if (!decoded) {
      return false;
    }

    // Kiểm tra blacklist
    const jti = (decoded as JWTPayload & { jti: string })?.jti;
    const blacklist = await prisma.tokenBlacklist.findFirst({ where: { jti } });

    if (blacklist) {
      return false;
    }

    const userId = decoded.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return false;
    }

    return user;
  },
  logout: async (token: string, userId: number) => {
    const decoded = verifyToken(token);

    const blacklist = await prisma.tokenBlacklist.create({
      data: {
        userId: userId,
        jti: (decoded as JWTPayload & { jti: string })?.jti as string,
        ttl: new Date((decoded as JWTPayload & { exp: number })?.exp * 1000),
      },
    });

    return blacklist;
  },
  refreshToken: async (refreshToken: string) => {
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return false;
    }

    // Kiểm tra refresh token trong database
    const jti = (decoded as JWTPayload & { jti: string })?.jti;
    const userId = decoded.userId;
    const refreshTokenFromDB = await prisma.refreshToken.findFirst({
      where: { jti, userId },
    });

    if (!refreshTokenFromDB) {
      return false;
    }

    const payload = {
      userId: decoded.userId,
      email: decoded.email,
    };

    const newAccessToken = generateToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    const decodeRefreshToken = decodeToken(newRefreshToken);

    // Tạo refresh token mới trong database
    await prisma.refreshToken.create({
      data: {
        userId: decoded.userId,
        jti: (decodeRefreshToken as { jti: string })?.jti as string,
        ttl: new Date(
          (decodeRefreshToken as JWTPayload & { exp: number })?.exp * 1000,
        ),
      },
    });

    // Xóa refresh token cũ trong database
    await prisma.refreshToken.delete({ where: { id: refreshTokenFromDB.id } });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },
  cleanBacklist: async () => {
    const now = new Date();
    await prisma.tokenBlacklist.deleteMany({
      where: {
        ttl: {
          lte: now,
        },
      },
    });
  },
  cleanRefreshToken: async () => {
    const now = new Date();
    await prisma.refreshToken.deleteMany({
      where: {
        ttl: {
          lte: now,
        },
      },
    });
  },
};
