/* eslint-disable @typescript-eslint/ban-ts-comment */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

// @ts-ignore
import { PrismaClient } from '@/prisma/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma: PrismaClient = new PrismaClient({ adapter });
