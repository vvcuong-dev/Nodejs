import { prisma } from "../libs/prisma";
import { userRepository } from "../repositories/user.repository";
import { cacheService } from "./cache.service";

export const userService = {
  getUsers: async () => {
    return cacheService.getOrSet("users:list", () => prisma.user.findMany());
  },
  getUserByEmail: async (email: string) => {
    const user = await userRepository.findByEmail(email);
    return user;
  },
};
