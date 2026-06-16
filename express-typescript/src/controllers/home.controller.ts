import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const HomeController = {
    index: async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        return res.render('home', { users });
    }

}