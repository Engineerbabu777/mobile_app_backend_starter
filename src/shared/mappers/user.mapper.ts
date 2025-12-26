import type { User } from '@/prisma/generated/prisma/client.js';
import { PublicUser } from '@/src/modules/auth/types/auth.types.js';

export const toPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
