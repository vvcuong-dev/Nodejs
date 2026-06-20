import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { guestMiddleware } from "../middlewares/guest.middleware";
import adminRouter from "./admin.route";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";

const router: Router = Router();

router.get("/", HomeController.index);
router.get("/auth/login", guestMiddleware, authController.login);
router.post("/auth/login", guestMiddleware, authController.handleLogin);
router.get("/auth/register", guestMiddleware, authController.register);
router.post(
  "/auth/register",
  guestMiddleware,
  validate(registerSchema),
  authController.handleRegister,
);

router.get("/auth/me", authMiddleware, authController.profile);

router.use("/admin", authMiddleware, adminRouter);

export default router;
