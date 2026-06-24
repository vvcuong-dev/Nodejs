import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { apiAuthController } from "../controllers/api/auth.controller";
import { loginSchema } from "../validators/auth.validator";
import { apiUserController } from "../controllers/api/user.controller";

const router: Router = Router();

router.post("/auth/login", validate(loginSchema), apiAuthController.login);
router.get("/auth/me", authMiddleware, apiAuthController.profile);
router.post("/auth/logout", authMiddleware, apiAuthController.logout);
router.post("/auth/refresh-token", apiAuthController.refreshToken);

router.get("/users", apiUserController.index);

export default router;
