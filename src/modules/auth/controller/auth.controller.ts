/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from 'express';

import { signupService } from '../service/auth.service.js';
import { SignupInput } from '../types/auth.types.js';

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
