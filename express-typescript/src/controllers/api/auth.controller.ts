import { Request, Response } from "express";
import { apiAuthService } from "../../services/api/auth.service";

export const apiAuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await apiAuthService.login({ email, password });

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", token });
  },
  profile: (req: Request, res: Response) => {
    const user = req.user;

    res.json({
      success: true,
      message: "Profile retrieved successfully",
      user: user,
    });
  },
  logout: async (req: Request, res: Response) => {
    await apiAuthService.logout(req.jti as string, req.user?.id as number);

    res.json({ success: true, message: "Logout successful" });
  },
};
