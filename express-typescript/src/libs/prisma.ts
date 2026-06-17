import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({
    adapter,
    omit: {
        user: {
            password: true,
        }
    },
    log: ['query', 'error', 'warn'],
});

export { prisma };