import { Request } from "express";
import { prisma } from "../libs/prisma";
import { userRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/hash";
import { cacheService } from "./cache.service";

export const userService = {
  getUsers: async (req: Request) => {
    const { q = "" } = req.query as { q: string };

    let cacheKey = "users:list";
    if (q) {
      cacheKey = `users:list:query:${q}`;
    }

    return cacheService.getOrSet(cacheKey, () =>
      prisma.user.findMany({
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
      }),
    );
  },
  getUserById: async (id: number) => {
    return cacheService.getOrSet(`users:detail:${id}`, () =>
      userRepository.findById(id),
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

    await cacheService.delete("users:list");
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

    await cacheService.delete(`users:detail:${data.id}`);
    await cacheService.deleteByPattern("users:list*");
    return user;
  },
  deleteUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (user) {
      await cacheService.delete(`users:detail:${id}`);
      await cacheService.deleteByPattern("users:list*");
    }

    return user;
  },
};
