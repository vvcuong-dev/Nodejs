import { Request, Response } from 'express';

export const userController = {
    index: (req: Request, res: Response) => {
        res.render('users/index');
    },
}