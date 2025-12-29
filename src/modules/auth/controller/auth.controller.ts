/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';

import {
  forgotPasswordService,
  resetPasswordService,
  signinService,
  signupService,
  verifyEmailService,
} from '../service/auth.service.js';
import {
  ForgotPasswordInput,
  ResetPasswordInput,
  SigninInput,
  SignupInput,
  VerifyEmailInput,
} from '../types/auth.types.js';

import { catchAsync } from '@/src/shared/utils/catch-async.js';

export const signupController = catchAsync(
  async (req: Request<{}, {}, SignupInput>, res: Response) => {
    const body = req.body;
    const result = await signupService(body);
    return res.status(201).json({
      success: true,
      message: 'Signup successful. Verification code sent to your email.',
      data: {
        id: result.user.id,
        email: result.user.email,
      },
    });
  },
);

export const loginController = catchAsync(
  async (req: Request<{}, {}, SigninInput>, res: Response): Promise<void> => {
    const result = await signinService(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const verifyEmailController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { code, email } = req.body as unknown as VerifyEmailInput;
    await verifyEmailService(code, email);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  },
);

export const forgotPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body as ForgotPasswordInput;
  await forgotPasswordService(email);

  res.status(200).json({
    success: true,
    message: 'Reset code sent to your email if the user exists',
  });
});

export const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { code, newPassword, email } = req.body as ResetPasswordInput;
  await resetPasswordService(code, newPassword, email);

  res.status(200).json({
    success: true,
    message: 'Password has been reset successfully',
  });
});
