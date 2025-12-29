import express from 'express';
import helmet from 'helmet';

import { routes } from './routes/index.js';

import { corsMiddleware } from '@/src/shared/middlewares/cors.js';
import { errorHandler } from '@/src/shared/middlewares/error-handler.js';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());

app.use('/api/v1/auth', routes.authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
