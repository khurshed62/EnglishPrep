import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

import { initDb } from './db/setup';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { testsRouter } from './routes/tests';
import { lessonsRouter } from './routes/lessons';
import { statsRouter } from './routes/stats';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// CORS configuration for frontend
app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (development friendly)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'EnglishPrep Backend API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Mount API routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tests', testsRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/stats', statsRouter);

// 404 Route Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'NotFound',
    message: 'The requested API endpoint does not exist',
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the server',
  });
});

// Initialize database and start listening
async function startServer() {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 EnglishPrep API Server is running on port ${PORT}`);
      console.log(`🌐 Frontend allowed origin: ${CLIENT_ORIGIN}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
