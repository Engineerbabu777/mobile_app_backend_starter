import { SignupInput } from '../types/auth.types.js';

import {
  EmailVerificationToken,
  PasswordResetToken,
  User,
} from '@/prisma/generated/prisma/client.js';
import { prisma } from '@/src/shared/database/prisma.js';

export const createUserRepository = async (data: SignupInput): Promise<User> => {
  return await prisma.user.create({ data });
};

export const findUserByEmailRepository = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const updateUserPasswordRepository = async (
  userId: string,
  password: string,
): Promise<User> => {
  return await prisma.user.update({ where: { id: userId }, data: { password } });
};

export const createPasswordResetCodeRepository = async (
  userId: string,
  code: string,
  expiresAt: Date,
): Promise<PasswordResetToken> => {
  return await prisma.passwordResetToken.create({
    data: { userId, code, expiresAt },
  });
};

export const findPasswordResetCodeRepository = async (
  code: string,
  email: string,
): Promise<PasswordResetToken | null> => {
  return await prisma.passwordResetToken.findFirst({ where: { code, user: { email: email } } });
};

export const deletePasswordResetCodeRepository = async (id: string): Promise<void> => {
  await prisma.passwordResetToken.delete({ where: { id } });
};

export const findEmailVerificationTokenRepository = async (
  email: string,
  code: string,
): Promise<EmailVerificationToken | null> => {
  return await prisma.emailVerificationToken.findFirst({
    where: { user: { email }, code: code },
  });
};

export const markUserVerifiedToken = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true },
  });
};

export const deleteVerificationTokenRepository = async (id: string): Promise<void> => {
  await prisma.emailVerificationToken.delete({
    where: { id },
  });
};

export const createEmailVerificationTokenRepository = async (
  userId: string,
  code: string,
  expiresAt: Date,
): Promise<EmailVerificationToken> => {
  return await prisma.emailVerificationToken.create({
    data: {
      userId,
      code,
      expiresAt,
    },
  });
};
