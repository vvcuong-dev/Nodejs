import { Request, Response } from "express";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    console.log("request session:", req.session.user);
    return res.render("home");
  },
};
