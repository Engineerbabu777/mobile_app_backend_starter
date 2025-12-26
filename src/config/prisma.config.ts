import 'dotenv/config';

import path from 'path';

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.resolve(process.cwd(), 'prisma/schema.prisma'),
  migrations: {
    path: path.resolve(process.cwd(), 'prisma/migrations'),
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
