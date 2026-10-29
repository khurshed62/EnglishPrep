"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsRouter = void 0;
const express_1 = require("express");
const setup_1 = require("../db/setup");
const auth_1 = require("../middleware/auth");
exports.testsRouter = (0, express_1.Router)();
// Helper to calculate IELTS Band Score from percentage
function calculateIeltsBandScore(correctCount, totalQuestions) {
    if (totalQuestions <= 0)
        return 6.0;
    const ratio = Math.max(0, Math.min(1, correctCount / totalQuestions));
    // IELTS conversion scale (standard 9.0 band scale)
    let band;
    if (ratio >= 0.95)
        band = 9.0;
    else if (ratio >= 0.88)
        band = 8.5;
    else if (ratio >= 0.80)
        band = 8.0;
    else if (ratio >= 0.72)
        band = 7.5;
    else if (ratio >= 0.65)
        band = 7.0;
    else if (ratio >= 0.58)
        band = 6.5;
    else if (ratio >= 0.50)
        band = 6.0;
    else if (ratio >= 0.42)
        band = 5.5;
    else if (ratio >= 0.35)
        band = 5.0;
    else if (ratio >= 0.28)
        band = 4.5;
    else if (ratio >= 0.20)
        band = 4.0;
    else
        band = 3.5;
    return band;
}
// GET /api/tests/results - Return user's test history (Auth required)
exports.testsRouter.get('/results', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.userId;
        const db = (0, setup_1.getDb)();
        const results = db.prepare(`
      SELECT
        tr.id,
        tr.test_id,
        tr.skill,
        tr.score,
        tr.answers,
        tr.completed_at,
        t.title as test_title,
        t.difficulty
      FROM test_results tr
      LEFT JOIN tests t ON tr.test_id = t.id
      WHERE tr.user_id = ?
      ORDER BY tr.completed_at DESC
    `).all(userId);
        const formatted = results.map((r) => ({
            id: r.id,
            testId: r.test_id,
            testTitle: r.test_title || r.test_id,
            skill: r.skill,
            score: r.score,
            difficulty: r.difficulty || 'Medium',
            answers: typeof r.answers === 'string' ? JSON.parse(r.answers || '{}') : r.answers,
            completedAt: r.completed_at,
        }));
        res.json({
            results: formatted,
            count: formatted.length,
        });
    }
    catch (error) {
        console.error('Error fetching test results:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve test history',
        });
    }
});
// GET /api/tests - Return list of tests filtered by skill
exports.testsRouter.get('/', (req, res) => {
    try {
        const skillParam = req.query.skill;
        const db = (0, setup_1.getDb)();
        let rows;
        if (skillParam) {
            const normalizedSkill = skillParam.toLowerCase().trim();
            rows = db.prepare(`
        SELECT id, title, skill, duration_minutes, total_questions, difficulty, description
        FROM tests
        WHERE LOWER(skill) = ?
        ORDER BY id ASC
      `).all(normalizedSkill);
        }
        else {
            rows = db.prepare(`
        SELECT id, title, skill, duration_minutes, total_questions, difficulty, description
        FROM tests
        ORDER BY skill ASC, id ASC
      `).all();
        }
        const tests = rows.map((r) => ({
            id: r.id,
            title: r.title,
            skill: r.skill,
            durationMinutes: r.duration_minutes,
            totalQuestions: r.total_questions,
            difficulty: r.difficulty,
            description: r.description,
        }));
        res.json({
            tests,
            count: tests.length,
        });
    }
    catch (error) {
        console.error('Error listing tests:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve tests',
        });
    }
});
// GET /api/tests/:id - Return test details with questions
exports.testsRouter.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = (0, setup_1.getDb)();
        const row = db.prepare('SELECT * FROM tests WHERE id = ?').get(id);
        if (!row) {
            res.status(404).json({
                error: 'NotFound',
                message: `Test with ID '${id}' was not found`,
            });
            return;
        }
        const sections = JSON.parse(row.sections_json || '[]');
        const test = {
            id: row.id,
            title: row.title,
            skill: row.skill,
            durationMinutes: row.duration_minutes,
            totalQuestions: row.total_questions,
            difficulty: row.difficulty,
            description: row.description,
            sections,
        };
        res.json({ test });
    }
    catch (error) {
        console.error(`Error retrieving test ${req.params.id}:`, error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to retrieve test details',
        });
    }
});
// POST /api/tests/:id/submit - Submit answers and calculate score (Auth required)
exports.testsRouter.post('/:id/submit', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { answers } = req.body;
        if (!answers) {
            res.status(400).json({
                error: 'ValidationError',
                message: 'Submission answers are required',
            });
            return;
        }
        const db = (0, setup_1.getDb)();
        const row = db.prepare('SELECT * FROM tests WHERE id = ?').get(id);
        if (!row) {
            res.status(404).json({
                error: 'NotFound',
                message: `Test with ID '${id}' was not found`,
            });
            return;
        }
        const sections = JSON.parse(row.sections_json || '[]');
        const skill = row.skill;
        // Collect all questions
        const allQuestions = [];
        sections.forEach((sec) => {
            if (Array.isArray(sec.questions)) {
                allQuestions.push(...sec.questions);
            }
        });
        let score = 7.0; // default realistic baseline band score
        let correctCount = 0;
        const detailedFeedback = [];
        // Objective scoring for Reading and Listening
        if (skill === 'reading' || skill === 'listening') {
            let scorableCount = 0;
            allQuestions.forEach((q) => {
                if (q.correctAnswer !== undefined) {
                    scorableCount++;
                    const userAnswer = typeof answers === 'object' ? answers[String(q.id)] : undefined;
                    let isCorrect = false;
                    if (userAnswer !== undefined && userAnswer !== null) {
                        const formattedUser = String(userAnswer).trim().toLowerCase();
                        if (Array.isArray(q.correctAnswer)) {
                            isCorrect = q.correctAnswer.some((ans) => String(ans).trim().toLowerCase() === formattedUser);
                        }
                        else {
                            isCorrect = String(q.correctAnswer).trim().toLowerCase() === formattedUser;
                        }
                    }
                    if (isCorrect)
                        correctCount++;
                    detailedFeedback.push({
                        questionId: q.id,
                        correct: isCorrect,
                        explanation: q.explanation,
                    });
                }
            });
            if (scorableCount > 0) {
                score = calculateIeltsBandScore(correctCount, scorableCount);
            }
            else {
                score = 7.0;
            }
        }
        else {
            // Writing and Speaking scoring
            // Calculate realistic band score based on response presence and length
            const answerValues = typeof answers === 'object' ? Object.values(answers) : [answers];
            const totalWords = answerValues
                .map((a) => (typeof a === 'string' ? a.trim().split(/\s+/).length : 0))
                .reduce((sum, len) => sum + len, 0);
            if (totalWords >= 250) {
                score = 7.5;
            }
            else if (totalWords >= 150) {
                score = 7.0;
            }
            else if (totalWords >= 50) {
                score = 6.5;
            }
            else {
                score = 6.0;
            }
        }
        // Save result into database
        const insertResult = db.prepare(`
      INSERT INTO test_results (user_id, test_id, skill, score, answers, completed_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `);
        const answersJson = typeof answers === 'string' ? answers : JSON.stringify(answers);
        const dbResult = insertResult.run(userId, id, skill, score, answersJson);
        res.status(201).json({
            success: true,
            resultId: dbResult.lastInsertRowid,
            testId: id,
            skill,
            score,
            totalQuestions: allQuestions.length,
            correctCount,
            feedback: detailedFeedback,
            completedAt: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error(`Error submitting test ${req.params.id}:`, error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Failed to process test submission',
        });
    }
});
