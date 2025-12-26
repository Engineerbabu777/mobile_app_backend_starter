/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SignupInput } from '../types/auth.types.js';

import { PasswordResetToken, User } from '@/prisma/generated/prisma/client.js';
import { prisma } from '@/src/shared/database/prisma.js';

export const createUserRepository = async (data: SignupInput): Promise<User> => {
  try {
    return await prisma.user.create({ data });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const findUserByEmailRepository = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const updateUserPasswordRepository = async (
  userId: string,
  password: string,
): Promise<User> => {
  try {
    return await prisma.user.update({ where: { id: userId }, data: { password } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const createPasswordResetTokenRepository = async (
  userId: string,
  token: string,
  expiresAt: Date,
): Promise<PasswordResetToken> => {
  try {
    return await prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const findPasswordResetTokenRepository = async (
  token: string,
): Promise<PasswordResetToken | null> => {
  try {
    return await prisma.passwordResetToken.findUnique({ where: { token } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const deletePasswordResetTokenRepository = async (
  id: string,
): Promise<PasswordResetToken> => {
  try {
    return await prisma.passwordResetToken.delete({ where: { id } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const findVerificationTokenToken = async (token: string) => {
  return await prisma.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });
};

export const markUserVerifiedToken = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true },
  });
};

export const deleteVerificationTokenToken = async (id: string): Promise<void> => {
  await prisma.emailVerificationToken.delete({
    where: { id },
  });
};

export const createPasswordResetToken = async (userId: string, token: string, expiresAt: Date) => {
  return await prisma.passwordResetToken.create({
    data: { userId, token, expiresAt },
  });
};
