import { addMinutes } from 'date-fns';

import {
  createEmailVerificationTokenRepository,
  createPasswordResetCodeRepository,
  createUserRepository,
  deletePasswordResetCodeRepository,
  deleteVerificationTokenRepository,
  findEmailVerificationTokenRepository,
  findPasswordResetCodeRepository,
  findUserByEmailRepository,
  markUserVerifiedToken,
  updateUserPasswordRepository,
} from '../respository/auth.repository.js';
import { AuthResponse, SigninInput, SignupInput } from '../types/auth.types.js';
import { sendResetPasswordEmailUtil, sendVerificationEmailUtil } from '../utils/auth.utils.js';

import { toPublicUser } from '@/src/shared/mappers/user.mapper.js';
import { AppError } from '@/src/shared/utils/app-error.js';
import { comparePassword, hashPassword } from '@/src/shared/utils/hash.js';
import { generateToken } from '@/src/shared/utils/jwt.js';

export const signupService = async (data: SignupInput): Promise<AuthResponse> => {
  const existingUser = await findUserByEmailRepository(data.email);
  if (existingUser) throw new AppError('Email already registered', 409);

  const hashed = await hashPassword(data.password);
  const user = await createUserRepository({ ...data, password: hashed });
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = addMinutes(new Date(), 10);

  await createEmailVerificationTokenRepository(user.id, verificationCode, expiresAt);
  await sendVerificationEmailUtil(user.email, verificationCode);
  return { user: toPublicUser(user) };
};

export const signinService = async (data: SigninInput): Promise<AuthResponse> => {
  const user = await findUserByEmailRepository(data.email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const isValid = await comparePassword(data.password, user.password);
  if (!isValid) throw new AppError('Invalid credentials', 401);

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: toPublicUser(user),
    token,
  };
};

export const verifyEmailService = async (token: string): Promise<void> => {
  const record = await findEmailVerificationTokenRepository(token);

  if (!record) {
    throw new AppError('Invalid verification code', 400);
  }

  if (record.expiresAt < new Date()) {
    throw new AppError('Verification code has expired', 400);
  }

  await markUserVerifiedToken(record.userId);
  await deleteVerificationTokenRepository(record.id);
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  const user = await findUserByEmailRepository(email);
  if (!user) throw new AppError('User with this email does not exist', 404);

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = addMinutes(new Date(), 10);

  await createPasswordResetCodeRepository(user.id, code, expiresAt);
  await sendResetPasswordEmailUtil(user.email, code);
};

export const resetPasswordService = async (
  code: string,
  newPassword: string,
  email: string,
): Promise<void> => {
  const record = await findPasswordResetCodeRepository(code, email);
  if (!record) throw new AppError('Invalid code', 400);
  if (record.expiresAt < new Date()) throw new AppError('Code expired', 400);

  const hashedPassword = await hashPassword(newPassword);
  await updateUserPasswordRepository(record.userId, hashedPassword);

  await deletePasswordResetCodeRepository(record.id);
};
