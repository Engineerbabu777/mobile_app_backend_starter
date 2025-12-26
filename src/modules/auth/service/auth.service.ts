/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createUserRepository,
  deleteVerificationTokenRepository,
  findUserByEmailRepository,
  findVerificationTokenToken,
  markUserVerifiedToken,
} from '../respository/auth.repository.js';
import { AuthResponse, SigninInput, SignupInput } from '../types/auth.types.js';

import { sendEmailHelper } from '@/src/shared/email/send-email.js';
import { verificationEmailTemplate } from '@/src/shared/email/templates/verification-email-template.js';
import { comparePassword, hashPassword } from '@/src/shared/utils/hash.js';
import { generateToken } from '@/src/shared/utils/jwt.js';

export const signupService = async (data: SignupInput): Promise<AuthResponse> => {
  const existingUser = await findUserByEmailRepository(data.email);
  if (existingUser) throw new Error('Email already registered');

  const hashed = await hashPassword(data.password);
  const user = await createUserRepository({ ...data, password: hashed });

  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const signinService = async (data: SigninInput): Promise<AuthResponse> => {
  const user = await findUserByEmailRepository(data.email);
  if (!user) throw new Error('Invalid credentials');

  const isValid = await comparePassword(data.password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const verifyEmailService = async (token: string): Promise<void> => {
  const record = await findVerificationTokenToken(token);

  if (!record) {
    throw new Error('Invalid or expired verification token');
  }

  if (record.expiresAt < new Date()) {
    throw new Error('Verification token has expired');
  }

  await markUserVerifiedToken(record.userId);
  await deleteVerificationTokenRepository(record.id);
};

export const sendVerificationEmailService = async (email: string, code: string): Promise<void> => {
  await sendEmailHelper({
    to: email,
    subject: 'Verify your email',
    html: verificationEmailTemplate(code),
  });
};
