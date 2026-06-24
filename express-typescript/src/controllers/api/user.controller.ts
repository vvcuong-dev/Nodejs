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
};
