-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
