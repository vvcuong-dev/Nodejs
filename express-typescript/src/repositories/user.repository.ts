import { BaseRepository } from './base.repository';
import { User } from '../generated/prisma/client';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super('user');
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.model.findUnique({ where: { email } });
    }
}

export const userRepository = new UserRepository();