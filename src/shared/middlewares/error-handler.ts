/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import logger from '../logger/logger.js';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error({
    message: (err as any).message,
    stack: (err as any).stack,
    route: (_req as any).originalUrl,
    method: (_req as any).method,
  });

  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: err as any as any,
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
