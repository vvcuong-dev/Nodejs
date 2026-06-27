import { prisma } from "../libs/prisma";
import { hashPassword } from "../utils/hash";
import { cacheService } from "./cache.service";
import { CACHE } from "../constants/cache.constant";

export const userService = {
  getUsers: async () => {
    return cacheService.getOrSetWithTag(
      CACHE.USER._KEY.LIST(),
      () => prisma.user.findMany({}),
      CACHE.USER.TAGS.ROOT(),
    );
  },
  getUserById: async (id: number) => {
    return cacheService.getOrSetWithTag(
      CACHE.USER._KEY.DETAIL(id),
      () =>
        prisma.user.findUnique({
          where: { id },
        }),
      CACHE.USER.TAGS.DETAIL(id.toString()),
    );
  },
  createUser: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword(data.password),
      },
    });

    if (!user) {
      return null;
    }

    await cacheService.invalidateTags(CACHE.USER.TAGS.ROOT());
    return user;
  },
  updateUser: async (data: { name: string; email: string }, id: number) => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    if (user) {
      await cacheService.invalidateTags(CACHE.USER.TAGS.ROOT());
    }

    return user;
  },
  deleteUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (user) {
      await cacheService.invalidateTags(CACHE.USER.TAGS.ROOT());
    }

    return user;
  },
};
