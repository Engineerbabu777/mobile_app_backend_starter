/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

// @ts-ignore
import { PrismaClient } from '@/prisma/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma: PrismaClient = new PrismaClient({ adapter });
