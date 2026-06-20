import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  login: (req: Request, res: Response) => {
    res.render("auth/login", {
      layout: false,
    });
  },
  register: (req: Request, res: Response) => {
    const errors = JSON.parse(req.flash("errors")?.[0] || "{}");

    res.render("auth/register", {
      layout: false,
      errors: errors,
    });
  },
  async handleRegister(req: Request, res: Response) {
    const { name, email, password } = req.body;
    await authService.register({
      name,
      email,
      password: password,
    });

    return res.redirect("/auth/login");
  },
};
