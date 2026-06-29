import { Request } from "express";
import crypto from "crypto";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../utils/hash";
import { cacheService } from "./cache.service";
import { CACHE } from "../constants/cache.constant";

export const userService = {
  getUsers: async (req: Request) => {
    const { page = 1, limit = 3, ...filter } = req.query;

    let hashFilters = "";

    if (Object.keys(filter).length > 0) {
      hashFilters = crypto
        .createHash("md5")
        .update(JSON.stringify(filter))
        .digest("hex");
    }

    return cacheService.getOrSetWithTag(
      CACHE.USER._KEY.LIST(limit as number, page as number, hashFilters),
      () => prisma.user.findMany({}),
      CACHE.USER.TAGS.LIST(),
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
    // const user = await prisma.user.update({
    //   where: { id },
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //   },
    // });

    // if (user) {
    //   await cacheService.invalidateTags(CACHE.USER.TAGS.DETAIL(id.toString()));
    //   await cacheService.invalidateTags(CACHE.USER.TAGS.LIST());
    // }

    // return user;

    const user = await cacheService.writeThrought(
      CACHE.USER._KEY.DETAIL(id),
      async () => {
        return prisma.user.update({
          where: { id },
          data: data,
        });
      },
    );

    if (user) {
      await cacheService.invalidateTags(CACHE.USER.TAGS.DETAIL(id.toString()));
      await cacheService.invalidateTags(CACHE.USER.TAGS.LIST());
    }

    return user;
  },
  deleteUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (user) {
      await cacheService.invalidateTags(CACHE.USER.TAGS.DETAIL(id.toString()));
      await cacheService.invalidateTags(CACHE.USER.TAGS.LIST());
    }

    return user;
  },
};
