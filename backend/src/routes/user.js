"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const setup_1 = require("../db/setup");
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.Router)();
// Apply auth middleware to all user routes
exports.userRouter.use(auth_1.authMiddleware);
function sanitizeUser(user) {
    const { password_hash, ...rest } = user;
    return rest;
}
// GET /api/user/profile
exports.userRouter.get('/profile', (req, res) => {
    try {
        const userId = req.user.userId;
        const db = (0, setup_1.getDb)();
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            res.status(404).json({
                error: 'NotFound',
                message: 'User profile not found',
            });
            return;
        }
        res.json({
            user: sanitizeUser(user),
        });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve profile',
        });
    }
});
// PUT /api/user/profile
exports.userRouter.put('/profile', (req, res) => {
    try {
        const userId = req.user.userId;
        const db = (0, setup_1.getDb)();
        const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!existingUser) {
            res.status(404).json({
                error: 'NotFound',
                message: 'User not found',
            });
            return;
        }
        const { name, phone, target_band, study_hours_per_day, ielts_date, email_notifications, language, } = req.body;
        const updatedName = typeof name === 'string' && name.trim().length > 0 ? name.trim() : existingUser.name;
        const updatedPhone = phone !== undefined ? (phone ? String(phone).trim() : null) : existingUser.phone;
        const updatedTargetBand = typeof target_band === 'number' ? target_band : existingUser.target_band;
        const updatedStudyHours = typeof study_hours_per_day === 'number' ? study_hours_per_day : existingUser.study_hours_per_day;
        const updatedIeltsDate = ielts_date !== undefined ? ielts_date : existingUser.ielts_date;
        const updatedNotifications = email_notifications !== undefined ? (email_notifications ? 1 : 0) : existingUser.email_notifications;
        const updatedLanguage = typeof language === 'string' ? language : existingUser.language;
        const updateStmt = db.prepare(`
      UPDATE users
      SET name = ?,
          phone = ?,
          target_band = ?,
          study_hours_per_day = ?,
          ielts_date = ?,
          email_notifications = ?,
          language = ?
      WHERE id = ?
    `);
        updateStmt.run(updatedName, updatedPhone, updatedTargetBand, updatedStudyHours, updatedIeltsDate, updatedNotifications, updatedLanguage, userId);
        const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        res.json({
            message: 'Profile updated successfully',
            user: sanitizeUser(updatedUser),
        });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to update profile',
        });
    }
});
// DELETE /api/user/account
exports.userRouter.delete('/account', (req, res) => {
    try {
        const userId = req.user.userId;
        const db = (0, setup_1.getDb)();
        const deleteTransaction = db.transaction(() => {
            db.prepare('DELETE FROM lesson_progress WHERE user_id = ?').run(userId);
            db.prepare('DELETE FROM test_results WHERE user_id = ?').run(userId);
            const result = db.prepare('DELETE FROM users WHERE id = ?').run(userId);
            return result.changes;
        });
        const deletedCount = deleteTransaction();
        if (deletedCount === 0) {
            res.status(404).json({
                error: 'NotFound',
                message: 'User account not found',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Account and associated data deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to delete account',
        });
    }
});
