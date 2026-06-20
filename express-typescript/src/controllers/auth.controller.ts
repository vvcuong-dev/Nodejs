import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  login: (req: Request, res: Response) => {
    const message = req.flash("message")[0];

    res.render("auth/login", {
      layout: false,
      message: message,
    });
  },
  handleLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const isLogin = await authService.login({ email, password }, req);

    if (!isLogin) {
      req.flash("message", "Invalid email or password.");
      req.flash("type", "error");
      return res.redirect("/auth/login");
    }

    return res.redirect("/");
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
    await authService.register({ name, email, password });

    req.flash("message", "Registration successful. Please log in.");
    req.flash("type", "success");

    return res.redirect("/auth/login");
  },
  profile: (req: Request, res: Response) => {
    const userFromRequest = req.user;
    res.render("auth/profile", {
      user: userFromRequest,
    });
  },
  logout: (req: Request, res: Response) => {
    delete req.session.user;

    return res.redirect("/auth/login");
  },
};
