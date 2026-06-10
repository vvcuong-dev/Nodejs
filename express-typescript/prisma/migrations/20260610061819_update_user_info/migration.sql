/*
  Warnings:

  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `user_infos` DROP FOREIGN KEY `user_infos_userId_fkey`;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `user_infos` ADD CONSTRAINT `user_infos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
