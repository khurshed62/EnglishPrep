"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const setup_1 = require("../db/setup");
const jwt_1 = require("../utils/jwt");
const auth_1 = require("../middleware/auth");
exports.authRouter = (0, express_1.Router)();
function sanitizeUser(user) {
    const { password_hash, ...rest } = user;
    return rest;
}
// POST /api/auth/register
exports.authRouter.post('/register', (req, res) => {
    try {
        const { name, email, password, phone, target_band, study_hours_per_day, ielts_date, language } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Name, email, and password are required',
            });
            return;
        }
        if (typeof password !== 'string' || password.length < 6) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Password must be at least 6 characters long',
            });
            return;
        }
        const normalizedEmail = String(email).toLowerCase().trim();
        const db = (0, setup_1.getDb)();
        // Check if user already exists
        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
        if (existingUser) {
            res.status(400).json({
                error: 'ConflictError',
                message: 'An account with this email address already exists',
            });
            return;
        }
        // Hash password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const passwordHash = bcryptjs_1.default.hashSync(password, salt);
        // Insert user
        const insertStmt = db.prepare(`
      INSERT INTO users (
        name, email, password_hash, phone, target_band, study_hours_per_day, ielts_date, email_notifications, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    `);
        const result = insertStmt.run(name.trim(), normalizedEmail, passwordHash, phone ? String(phone).trim() : null, typeof target_band === 'number' ? target_band : 7.0, typeof study_hours_per_day === 'number' ? study_hours_per_day : 1, ielts_date || null, language || 'en');
        const userId = Number(result.lastInsertRowid);
        const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        const tokenPayload = { userId: newUser.id, email: newUser.email };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.status(201).json({
            accessToken,
            refreshToken,
            user: sanitizeUser(newUser),
        });
    }
    catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to register user',
        });
    }
});
// POST /api/auth/login
exports.authRouter.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Email and password are required',
            });
            return;
        }
        const normalizedEmail = String(email).toLowerCase().trim();
        const db = (0, setup_1.getDb)();
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);
        if (!user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid email or password',
            });
            return;
        }
        const isMatch = bcryptjs_1.default.compareSync(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid email or password',
            });
            return;
        }
        const tokenPayload = { userId: user.id, email: user.email };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.json({
            accessToken,
            refreshToken,
            user: sanitizeUser(user),
        });
    }
    catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to log in',
        });
    }
});
// POST /api/auth/google
exports.authRouter.post('/google', (req, res) => {
    try {
        const { email, name, language } = req.body;
        if (!email) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Email is required',
            });
            return;
        }
        const normalizedEmail = String(email).toLowerCase().trim();
        const db = (0, setup_1.getDb)();
        let user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);
        if (!user) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const passwordHash = bcryptjs_1.default.hashSync(Math.random().toString(36), salt);
            const userName = (name && String(name).trim()) || normalizedEmail.split('@')[0];
            const insertStmt = db.prepare(`
                INSERT INTO users (
                    name, email, password_hash, target_band, study_hours_per_day, email_notifications, language
                ) VALUES (?, ?, ?, 7.0, 1, 1, ?)
            `);
            const result = insertStmt.run(userName, normalizedEmail, passwordHash, language || 'en');
            const userId = Number(result.lastInsertRowid);
            user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        }
        const tokenPayload = { userId: user.id, email: user.email };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.json({
            accessToken,
            refreshToken,
            user: sanitizeUser(user),
        });
    } catch (error) {
        console.error('Error in google login:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to log in with Google',
        });
    }
});
// POST /api/auth/refresh
exports.authRouter.post('/refresh', (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Refresh token is required',
            });
            return;
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid or expired refresh token',
            });
            return;
        }
        const db = (0, setup_1.getDb)();
        const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(decoded.userId);
        if (!user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'User no longer exists',
            });
            return;
        }
        const tokenPayload = { userId: user.id, email: user.email };
        const newAccessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const newRefreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    }
    catch (error) {
        console.error('Error in refresh:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to refresh token',
        });
    }
});
// GET /api/auth/me
exports.authRouter.get('/me', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.userId;
        const db = (0, setup_1.getDb)();
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            res.status(404).json({
                error: 'NotFound',
                message: 'User no longer exists',
            });
            return;
        }
        res.json({
            user: sanitizeUser(user),
        });
    }
    catch (error) {
        console.error('Error in /me:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to fetch current user profile',
        });
    }
});
