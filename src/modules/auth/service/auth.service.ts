/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createUserRepository,
  deleteVerificationTokenRepository,
  findEmailVerificationTokenRepository,
  findUserByEmailRepository,
  markUserVerifiedToken,
} from '../respository/auth.repository.js';
import { AuthResponse, SigninInput, SignupInput } from '../types/auth.types.js';
import { sendVerificationEmailUtil } from '../utils/auth.utils.js';

import { toPublicUser } from '@/src/shared/mappers/user.mapper.js';
import { comparePassword, hashPassword } from '@/src/shared/utils/hash.js';
import { generateToken } from '@/src/shared/utils/jwt.js';

export const signupService = async (data: SignupInput): Promise<AuthResponse> => {
  const existingUser = await findUserByEmailRepository(data.email);
  if (existingUser) throw new Error('Email already registered');

  const hashed = await hashPassword(data.password);
  const user = await createUserRepository({ ...data, password: hashed });
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  await sendVerificationEmailUtil(user.email, verificationCode);
  return { user: toPublicUser(user) };
};

export const signinService = async (data: SigninInput): Promise<AuthResponse> => {
  const user = await findUserByEmailRepository(data.email);
  if (!user) throw new Error('Invalid credentials');

  const isValid = await comparePassword(data.password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: toPublicUser(user),
    token,
  };
};

export const verifyEmailService = async (token: string): Promise<void> => {
  const record = await findEmailVerificationTokenRepository(token);

  if (!record) {
    throw new Error('Invalid or expired verification token');
  }

  if (record.expiresAt < new Date()) {
    throw new Error('Verification token has expired');
  }

  await markUserVerifiedToken(record.userId);
  await deleteVerificationTokenRepository(record.id);
};
