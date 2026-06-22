import cron from "node-cron";
import { apiAuthService } from "../services/api/auth.service";

cron.schedule("0 0 * * *", () => {
  // Chạy công việc hàng ngày vào lúc 00:00
  apiAuthService.cleanBacklist();
  apiAuthService.cleanRefreshToken();
});
