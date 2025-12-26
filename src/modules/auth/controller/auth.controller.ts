/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from 'express';

import { signinService, signupService } from '../service/auth.service.js';
import { SigninInput, SignupInput } from '../types/auth.types.js';

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
