-- AlterTable
ALTER TABLE `user` ADD COLUMN `forgotPasswordToken` VARCHAR(191) NULL,
    ADD COLUMN `forgotPasswordTokenExpiry` INTEGER NULL;
