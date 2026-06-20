import { Request, Response } from "express";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    const user = req.session.user;

    return res.render("home", { user });
  },
};
