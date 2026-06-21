import { prisma } from "../../libs/prisma";
import { JWTPayload, LoginData } from "../../types/auth.type";
import { verifyPassword } from "../../utils/hash";
import { generateToken, verifyToken } from "../../utils/jwt";

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
    const token = generateToken({ userId: user.id, email: user.email });

    return token;
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
};
