import { SignupInput } from '../types/auth.types.js';

import { User } from '@/prisma/generated/prisma/client.js';
import { prisma } from '@/src/shared/database/prisma.js';

export const createUserRepository = async (data: SignupInput): Promise<User> => {
  return prisma.user.create({ data });
};
