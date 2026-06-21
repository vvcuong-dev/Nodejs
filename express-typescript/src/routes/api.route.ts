import { Router } from "express";
import { userController } from "../controllers/api/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userSchema } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";
import { apiAuthController } from "../controllers/api/auth.controller";
import { loginSchema } from "../validators/auth.validator";

const router: Router = Router();

router.post("/auth/login", validate(loginSchema), apiAuthController.login);
router.get("/auth/me", authMiddleware, apiAuthController.profile);
router.post("/auth/logout", authMiddleware, apiAuthController.logout);

router.post("/auth/refresh-token", apiAuthController.refreshToken);

router.get("/users", authMiddleware, userController.index);
router.post("/users", validate(userSchema), userController.create);

export default router;
