/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import logger from '../logger/logger.js';
import { AppError } from '../utils/app-error.js';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const error = err as any;

  logger.error({
    message: error.message,
    stack: error.stack,
    route: (_req as any).originalUrl,
    method: (_req as any).method,
  });

  if (err instanceof ZodError) {
    const errors = err as any;

    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
