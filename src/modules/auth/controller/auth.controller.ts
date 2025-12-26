/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from 'express';

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
  VerifyEmailQueryInput,
} from '../types/auth.types.js';

export const signupController = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request<{}, {}, SigninInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await signinService(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.query as unknown as VerifyEmailQueryInput;
    await verifyEmailService(token);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as ForgotPasswordInput;
    await forgotPasswordService(email);

    res.status(200).json({
      success: true,
      message: 'Reset code sent to your email if the user exists',
    });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, newPassword, email } = req.body as ResetPasswordInput;
    await resetPasswordService(code, newPassword, email);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (err) {
    next(err);
  }
};
