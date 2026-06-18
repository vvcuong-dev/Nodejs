import { Request, Response } from "express";
import { userService } from "../../services/user.service";
import { ErrorWithStatus } from "../../types/error.type";

export const userController = {
  index(req: Request, res: Response) {
    res.render("users/index");
  },
  async find(req: Request, res: Response) {
    const { email } = req.params as { email: string };

    if (!email) {
      throw new Error("Email parameter is required");
    }

    const user = await userService.getUserByEmail(email);

    if (!user) {
      const error: ErrorWithStatus = new Error("User not found");
      error.status = 404;
      throw error;
    }

    res.render("users/detail", { user });
  },
  create(req: Request, res: Response) {
    const errorsJSON = req.flash("errors");
    const errors = JSON.parse(errorsJSON[0] ?? "{}");

    console.log("Validation errors:", errors);
    res.render("users/create", { errors });
  },
  store(req: Request, res: Response) {
    console.log(req.body);

    return res.redirect("/admin/users");
  },
};
