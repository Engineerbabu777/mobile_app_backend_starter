import { SignupInput } from '../types/auth.types.js';

import { User } from '@/prisma/generated/prisma/client.js';
import { prisma } from '@/src/shared/database/prisma.js';

export const createUserRepository = async (data: SignupInput): Promise<User> => {
  return prisma.user.create({ data });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};
