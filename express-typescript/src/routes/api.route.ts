import { Router } from "express";
import apiV1Routes from "./api/v1";
import { rateLimitMiddleware } from "../middlewares/rate-limit.middleware";

const router: Router = Router();

router.use(rateLimitMiddleware);

router.use("/v1", apiV1Routes);

export default router;
