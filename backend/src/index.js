"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const setup_1 = require("./db/setup");
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const tests_1 = require("./routes/tests");
const lessons_1 = require("./routes/lessons");
const stats_1 = require("./routes/stats");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
// CORS configuration for frontend
app.use((0, cors_1.default)({
    origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Body parsers
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Request logging (development friendly)
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'EnglishPrep Backend API',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
    });
});
// Mount API routes
app.use('/api/auth', auth_1.authRouter);
app.use('/api/user', user_1.userRouter);
app.use('/api/tests', tests_1.testsRouter);
app.use('/api/lessons', lessons_1.lessonsRouter);
app.use('/api/stats', stats_1.statsRouter);
// 404 Route Handler
app.use((_req, res) => {
    res.status(404).json({
        error: 'NotFound',
        message: 'The requested API endpoint does not exist',
    });
});
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled server error:', err);
    res.status(err.status || 500).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'An unexpected error occurred on the server',
    });
});
// Initialize database and start listening
async function startServer() {
    try {
        await (0, setup_1.initDb)();
        app.listen(PORT, () => {
            console.log(`===============================================`);
            console.log(`🚀 EnglishPrep API Server is running on port ${PORT}`);
            console.log(`🌐 Frontend allowed origin: ${CLIENT_ORIGIN}`);
            console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
            console.log(`===============================================`);
        });
    }
    catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
}
startServer();
exports.default = app;
