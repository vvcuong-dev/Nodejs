import { Request, Response } from "express";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    return res.render("home");
  },
};
