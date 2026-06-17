import { Request, Response } from 'express';
import { userService } from '../../services/user.service';

export const userController = {
    index: async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.json({ users });
    },
    create: async (req: Request, res: Response) => {
        const body = req.body;
        const query = req.query;
        console.log('Received query parameters:', query);
        console.log('Received user data:', body);
        return res.json({ message: 'User created successfully' });
    }
};