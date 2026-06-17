import { Request, Response } from 'express';
import { userService } from '../../services/user.service';
import { ErrorWithStatus } from '../../types/error.type';

export const userController = {
    index(req: Request, res: Response) {
        res.render('users/index');
    },
    async find(req: Request, res: Response) {
        const { email } = req.params as { email: string };

        if (!email) {
            throw new Error('Email parameter is required');
        }

        const user = await userService.getUserByEmail(email);

        if (!user) {
            const error: ErrorWithStatus = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.render('users/detail', { user });
    }
}