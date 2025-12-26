/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SignupInput } from '../types/auth.types.js';

import { PasswordResetToken, User } from '@/prisma/generated/prisma/client.js';
import { prisma } from '@/src/shared/database/prisma.js';

export const createUserRepository = async (data: SignupInput): Promise<User> => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const updateUserPassword = async (userId: string, password: string): Promise<User> => {
  return await prisma.user.update({ where: { id: userId }, data: { password } });
};

export const createPasswordResetToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
): Promise<PasswordResetToken> => {
  return await prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
};
