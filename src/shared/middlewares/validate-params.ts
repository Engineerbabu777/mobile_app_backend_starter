import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validateParams =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params) as typeof req.params & typeof schema;
      next();
    } catch (err) {
      next(err);
    }
  };
