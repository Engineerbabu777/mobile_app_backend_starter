/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('FATAL_ERROR: JWT_SECRET environment variable is not defined.');
}
const JWT_SECRET: string = process.env.JWT_SECRET;

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
