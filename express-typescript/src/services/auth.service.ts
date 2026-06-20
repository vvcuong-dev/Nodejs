import { prisma } from "../libs/prisma";
import { RegisterData } from "../types/auth.type";

export const authService = {
  register: async (data: RegisterData) => {
    const { name, email, password } = data;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return newUser;
  },
};
