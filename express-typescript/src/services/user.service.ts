import { Request } from "express";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../utils/hash";
import { cacheService } from "./cache.service";

const USER_CACHE_VERSION = "1.1";

export const userService = {
  getUsers: async (req: Request) => {
    const { q = "" } = req.query as { q: string };
    const listTagVersion = await cacheService.tagVersion("list-version");

    let cacheKey = `users:${USER_CACHE_VERSION}:list:${listTagVersion}`;
    if (q) {
      cacheKey = `users:${USER_CACHE_VERSION}:list:${listTagVersion}:query:${q}`;
    }

    return cacheService.getOrSet(cacheKey, () =>
      prisma.user.findMany({
        omit: {
          password: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: q,
              },
              email: {
                contains: q,
              },
            },
          ],
        },
        orderBy: {
          id: "asc",
        },
      }),
    );
  },
  getUserById: async (id: number) => {
    return cacheService.getOrSet(
      `users:${USER_CACHE_VERSION}:detail:${id}`,
      () =>
        prisma.user.findUnique({
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
          where: { id },
        }),
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

    await cacheService.delete(`users:${USER_CACHE_VERSION}:list`);
    return user;
  },
  updateUser: async (data: { id: number; name: string; email: string }) => {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    if (!user) {
      return null;
    }

    await cacheService.delete(`users:${USER_CACHE_VERSION}:detail:${data.id}`);
    // await cacheService.deleteByPattern("users:list*");
    await cacheService.invalidateTagVersion("list-version");
    return user;
  },
  deleteUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (user) {
      await cacheService.delete(`users:${USER_CACHE_VERSION}:list`);
      // await cacheService.deleteByPattern("users:list*");
      await cacheService.delete(`users:${USER_CACHE_VERSION}:detail:${id}`);
    }

    return user;
  },
};
