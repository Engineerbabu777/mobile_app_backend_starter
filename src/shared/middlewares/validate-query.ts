import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as typeof req.params & typeof schema;
      next();
    } catch (err) {
      next(err);
    }
  };
