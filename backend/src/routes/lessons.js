"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonsRouter = void 0;
const express_1 = require("express");
const setup_1 = require("../db/setup");
const auth_1 = require("../middleware/auth");
exports.lessonsRouter = (0, express_1.Router)();
// GET /api/lessons - Return list of lessons optionally filtered by level
exports.lessonsRouter.get('/', auth_1.optionalAuthMiddleware, (req, res) => {
    try {
        const levelParam = req.query.level;
        const userId = req.user?.userId;
        const db = (0, setup_1.getDb)();
        let rows;
        if (levelParam) {
            const normalizedLevel = levelParam.toLowerCase().trim();
            rows = db.prepare(`
        SELECT id, title, level, skill, duration_minutes, order_index, description
        FROM lessons
        WHERE LOWER(level) = ?
        ORDER BY order_index ASC, id ASC
      `).all(normalizedLevel);
        }
        else {
            rows = db.prepare(`
        SELECT id, title, level, skill, duration_minutes, order_index, description
        FROM lessons
        ORDER BY level ASC, order_index ASC
      `).all();
        }
        // If user is authenticated, query their completed lessons
        let completedSet = new Set();
        if (userId) {
            const completedRows = db.prepare(`
        SELECT lesson_id FROM lesson_progress WHERE user_id = ? AND completed = 1
      `).all(userId);
            completedSet = new Set(completedRows.map((c) => c.lesson_id));
        }
        const lessons = rows.map((r) => ({
            id: r.id,
            title: r.title,
            level: r.level,
            skill: r.skill,
            durationMinutes: r.duration_minutes,
            orderIndex: r.order_index,
            description: r.description,
            completed: completedSet.has(r.id),
        }));
        res.json({
            lessons,
            count: lessons.length,
        });
    }
    catch (error) {
        console.error('Error listing lessons:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve lessons',
        });
    }
});
// GET /api/lessons/:id - Return lesson content
exports.lessonsRouter.get('/:id', auth_1.optionalAuthMiddleware, (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const db = (0, setup_1.getDb)();
        const row = db.prepare('SELECT * FROM lessons WHERE id = ?').get(id);
        if (!row) {
            res.status(404).json({
                error: 'NotFound',
                message: `Lesson with ID '${id}' was not found`,
            });
            return;
        }
        const content = JSON.parse(row.content_json || '{}');
        let userProgress = {
            completed: false,
            score: null,
            completedAt: null,
        };
        if (userId) {
            const progressRow = db.prepare(`
        SELECT completed, score, completed_at FROM lesson_progress WHERE user_id = ? AND lesson_id = ?
      `).get(userId, id);
            if (progressRow) {
                userProgress = {
                    completed: Boolean(progressRow.completed),
                    score: progressRow.score,
                    completedAt: progressRow.completed_at,
                };
            }
        }
        const lesson = {
            id: row.id,
            title: row.title,
            level: row.level,
            skill: row.skill,
            durationMinutes: row.duration_minutes,
            orderIndex: row.order_index,
            description: row.description,
            content,
        };
        res.json({
            lesson,
            progress: userProgress,
        });
    }
    catch (error) {
        console.error(`Error retrieving lesson ${req.params.id}:`, error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve lesson details',
        });
    }
});
// POST /api/lessons/:id/complete - Mark lesson as completed (Auth required)
exports.lessonsRouter.post('/:id/complete', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { score } = req.body;
        const db = (0, setup_1.getDb)();
        // Verify lesson exists
        const lesson = db.prepare('SELECT id FROM lessons WHERE id = ?').get(id);
        if (!lesson) {
            res.status(404).json({
                error: 'NotFound',
                message: `Lesson with ID '${id}' was not found`,
            });
            return;
        }
        const lessonScore = typeof score === 'number' ? score : 100;
        // Check if progress entry already exists
        const existing = db.prepare(`
      SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ?
    `).get(userId, id);
        if (existing) {
            db.prepare(`
        UPDATE lesson_progress
        SET completed = 1, score = ?, completed_at = datetime('now')
        WHERE id = ?
      `).run(lessonScore, existing.id);
        }
        else {
            db.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, completed, score, completed_at)
        VALUES (?, ?, 1, ?, datetime('now'))
      `).run(userId, id, lessonScore);
        }
        res.json({
            success: true,
            lessonId: id,
            completed: true,
            score: lessonScore,
            completedAt: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error(`Error completing lesson ${req.params.id}:`, error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to mark lesson as completed',
        });
    }
});
