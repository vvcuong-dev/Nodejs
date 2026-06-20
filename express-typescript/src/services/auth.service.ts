import { Request } from "express";
import { prisma } from "../libs/prisma";
import { LoginData, RegisterData } from "../types/auth.type";
import { hashPassword, verifyPassword } from "../utils/hash";

export const authService = {
  register: async (data: RegisterData) => {
    const { name, email, password } = data;

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword(password),
      },
    });

    return newUser;
  },
  existingEmail: async (email: string) => {
    return await prisma.user.count({
      where: {
        email: email,
      },
    });
  },
  login: async (data: LoginData, req: Request) => {
    const { email, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    const hashedPassword = user.password;
    if (!verifyPassword(password, hashedPassword)) {
      return false;
    }

    req.session.user = user;
    return true;
  },
};
