/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SignupInput } from '../types/auth.types.js';

import {
  EmailVerificationToken,
  PasswordResetToken,
  User,
} from '@/prisma/generated/prisma/client.js';
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

export const createPasswordResetCodeRepository = async (
  userId: string,
  code: string,
  expiresAt: Date,
): Promise<PasswordResetToken> => {
  try {
    return await prisma.passwordResetToken.create({
      data: { userId, code, expiresAt },
    });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const findPasswordResetCodeRepository = async (
  code: string,
  email: string,
): Promise<PasswordResetToken | null> => {
  try {
    return await prisma.passwordResetToken.findFirst({ where: { code, user: { email: email } } });
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

export const findEmailVerificationTokenRepository = async (
  code: string,
): Promise<EmailVerificationToken | null> => {
  return await prisma.emailVerificationToken.findFirst({
    where: { code },
  });
};

export const markUserVerifiedToken = async (userId: string): Promise<void> => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const deleteVerificationTokenRepository = async (id: string): Promise<void> => {
  try {
    await prisma.emailVerificationToken.delete({
      where: { id },
    });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const deletePasswordResetCodeRepository = async (id: string): Promise<void> => {
  await prisma.passwordResetToken.delete({ where: { id } });
};

export const createEmailVerificationTokenRepository = async (
  userId: string,
  code: string,
  expiresAt: Date,
): Promise<EmailVerificationToken> => {
  try {
    return await prisma.emailVerificationToken.create({
      data: {
        userId,
        code,
        expiresAt,
      },
    });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const deleteEmailVerificationTokenRepository = async (id: string): Promise<void> => {
  try {
    await prisma.emailVerificationToken.delete({ where: { id } });
  } catch (err: unknown) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};
