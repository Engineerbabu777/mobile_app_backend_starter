import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
