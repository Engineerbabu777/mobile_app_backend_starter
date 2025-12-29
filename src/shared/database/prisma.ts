import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/prisma/generated/prisma/client.js';
import { env } from '@/src/config/env.config.js';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const prisma: PrismaClient = new PrismaClient({ adapter });
