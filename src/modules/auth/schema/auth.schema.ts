import z from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  code: z.string(),
  newPassword: z.string().min(6),
  email: z.string().email(),
});

export const verifyEmailSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
  email: z.string().email(),
});
