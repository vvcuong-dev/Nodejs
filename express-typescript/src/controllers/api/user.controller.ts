import { Request, Response } from "express";
import { userService } from "../../services/user.service";

export const apiUserController = {
  index: async (req: Request, res: Response) => {
    const user = await userService.getUsers();

    res.json({
      message: "User index",
      data: user,
    });
  },
  find: async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User found",
      data: user,
    });
  },
  create: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });

    res.status(201).json({
      message: "User created",
      data: user,
    });
  },
};
