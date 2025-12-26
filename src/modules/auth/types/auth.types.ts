import { User } from '@/prisma/generated/prisma/client.js';

export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface VerifyEmailQueryInput {
  token: string;
  password: string;
}

export interface AuthResponse {
  user: Pick<User, 'id' | 'email' | 'name'>;
  token?: string;
}
