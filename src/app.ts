import express from 'express';

import authRoutes from './modules/auth/routes/auth.routes.js';

import { corsMiddleware } from '@/src/shared/middlewares/cors.js';
import { errorHandler } from '@/src/shared/middlewares/error-handler.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
