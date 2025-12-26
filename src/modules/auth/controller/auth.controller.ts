/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from 'express';

import { signinService, signupService, verifyEmailService } from '../service/auth.service.js';
import { SigninInput, SignupInput, VerifyEmailQueryInput } from '../types/auth.types.js';

export const signupController = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const result = await signupService(body);
    return res.status(201).json({ success: true, data: result });
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
  req: Request<{}, {}, {}, VerifyEmailQueryInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await verifyEmailService(req.query.token);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (err) {
    next(err);
  }
};
