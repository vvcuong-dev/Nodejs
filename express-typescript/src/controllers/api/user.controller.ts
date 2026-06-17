import { Request, Response } from 'express';
import { userService } from '../../services/user.service';

export const userController = {
    index: async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.json({ users });
    },
};