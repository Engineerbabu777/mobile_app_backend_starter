/*
  Warnings:

  - You are about to drop the column `isVerified` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "isVerified";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
