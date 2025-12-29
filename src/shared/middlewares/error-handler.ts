import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import logger from '../logger/logger.js';
import { AppError } from '../utils/app-error.js';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof Error) {
    logger.error({
      message: err.message,
      stack: err.stack,
      route: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.error({
      message: 'Unknown error',
      route: req.originalUrl,
      method: req.method,
    });
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues,
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
