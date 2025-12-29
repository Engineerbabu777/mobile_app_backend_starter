/* eslint-disable unused-imports/no-unused-vars */

import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '@/src/config/env.config.js';

const JWT_SECRET: string = env.JWT_SECRET;

const JWT_EXPIRES_IN = '1h';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
