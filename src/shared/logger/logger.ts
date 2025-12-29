import pino from 'pino';

import { env } from '../../config/env.config.js';

const logger = pino({
  transport:
    env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  level: env.LOG_LEVEL,
});

export default logger;
