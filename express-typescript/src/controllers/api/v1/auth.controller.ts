import { Request, Response } from "express";
import { apiAuthService } from "../../../services/api/auth.service";
import { errorResponse, successResponse } from "../../../utils/response";

export const apiAuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await apiAuthService.login({ email, password });

    if (!token) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    return successResponse(res, token, "Login successful", 200);
  },
  profile: async (req: Request, res: Response) => {
    const user = await apiAuthService.getProfile(req.token as string);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, user, "Profile retrieved successfully", 200);
  },
  logout: async (req: Request, res: Response) => {
    await apiAuthService.logout(req.token as string, req.user?.id as number);

    return successResponse(res, null, "Logout successful", 200);
  },
  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, "Refresh token is required", 400);
    }

    const newToken = await apiAuthService.refreshToken(refreshToken);

    if (!newToken) {
      return errorResponse(res, "Invalid refresh token", 401);
    }

    return successResponse(res, newToken, "Token refreshed successfully", 200);
  },
};
