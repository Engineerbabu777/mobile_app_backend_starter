import cors from 'cors';

// const allowedOrigins = env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];
const allowedOrigins = ['*'];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
