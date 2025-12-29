import app from './app.js';
import { env } from './config/env.config.js';
import logger from './shared/logger/logger.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error({ message: 'Unhandled Rejection', reason });
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error({ message: 'Uncaught Exception', err });
  process.exit(1);
});
