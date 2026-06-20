import { prisma } from "../libs/prisma";
import { RegisterData } from "../types/auth.type";
import { hashPassword } from "../utils/hash";

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
};
