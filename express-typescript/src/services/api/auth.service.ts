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
    const jtiRefreshToken = decodeToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        jti: (jtiRefreshToken as { jti: string })?.jti as string,
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
  logout: async (jti: string, userId: number) => {
    const blacklist = await prisma.tokenBlacklist.create({
      data: {
        userId: userId,
        jti: jti,
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
    const existingRefreshToken = await prisma.refreshToken.count({
      where: { jti, userId },
    });

    if (!existingRefreshToken) {
      return false;
    }

    const payload = {
      userId: decoded.userId,
      email: decoded.email,
    };

    const accessToken = generateToken(payload);

    return { accessToken: accessToken, refreshToken: refreshToken };
  },
};
