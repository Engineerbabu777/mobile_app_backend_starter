/*
  Warnings:

  - You are about to drop the column `token` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EmailVerificationToken_token_key";

-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_userId_key" ON "EmailVerificationToken"("userId");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_code_idx" ON "EmailVerificationToken"("code");
