import { prisma } from '../libs/prisma';
import { userRepository } from '../repositories/user.repository';

export const userService = {
    getUsers: async () => {
        const users = await prisma.user.findMany();
        return users;
    },
    getUserByEmail: async (email: string) => {
        const user = await userRepository.findByEmail(email);
        return user;
    }
}