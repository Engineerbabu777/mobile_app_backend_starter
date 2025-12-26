import { createUserRepository, findUserByEmailRepository } from '../respository/auth.repository.js';
import { AuthResponse, SignupInput } from '../types/auth.types.js';

import { hashPassword } from '@/src/shared/utils/hash.js';
import { generateToken } from '@/src/shared/utils/jwt.js';

export const signupService = async (data: SignupInput): Promise<AuthResponse> => {
  const existingUser = await findUserByEmailRepository(data.email);
  if (existingUser) throw new Error('Email already registered');

  const hashed = await hashPassword(data.password);
  const user = await createUserRepository({ ...data, password: hashed });

  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};
