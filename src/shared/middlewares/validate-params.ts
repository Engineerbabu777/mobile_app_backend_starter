import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validateParams =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
