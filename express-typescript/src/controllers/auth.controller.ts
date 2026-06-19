import { Request, Response } from "express";

export const authController = {
  login: (req: Request, res: Response) => {
    res.render("auth/login", {
      layout: false,
    });
  },
};
