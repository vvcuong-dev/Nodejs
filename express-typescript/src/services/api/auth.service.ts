import { prisma } from "../../libs/prisma";
import { LoginData } from "../../types/auth.type";
import { verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

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
};
