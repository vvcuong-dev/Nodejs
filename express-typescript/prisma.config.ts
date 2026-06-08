import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL as string, 
    // sử dụng as mục đích là để TypeScript hiểu rằng biến này sẽ luôn có giá trị và không phải là undefined. Nếu không có as, 
    // TypeScript sẽ cảnh báo rằng biến này có thể là undefined
  },
});
