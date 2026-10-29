"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = getDb;
exports.initDb = initDb;
const sql_js_1 = __importDefault(require("sql.js"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedTests_1 = require("../data/seedTests");
const seedLessons_1 = require("../data/seedLessons");
// Wrapper to provide a better-sqlite3-compatible API over sql.js
class DatabaseWrapper {
    sqlDb;
    dbPath;
    inTransaction = 0;
    constructor(sqlDb, dbPath) {
        this.sqlDb = sqlDb;
        this.dbPath = dbPath;
    }
    exec(sql) {
        this.sqlDb.run(sql);
        if (this.inTransaction === 0) {
            this.save();
        }
    }
    pragma(pragma) {
        try {
            this.sqlDb.run(`PRAGMA ${pragma}`);
        }
        catch {
            // some pragmas may not be supported in sql.js
        }
    }
    prepare(sql) {
        return new PreparedStatement(this.sqlDb, sql, this);
    }
    transaction(fn) {
        return ((...args) => {
            this.inTransaction++;
            this.sqlDb.run('BEGIN TRANSACTION');
            try {
                const result = fn(...args);
                this.sqlDb.run('COMMIT');
                return result;
            }
            catch (e) {
                console.error('Inner transaction error:', e);
                try {
                    this.sqlDb.run('ROLLBACK');
                }
                catch (_) { }
                throw e;
            }
            finally {
                this.inTransaction--;
                if (this.inTransaction === 0) {
                    this.save();
                }
            }
        });
    }
    save() {
        if (this.inTransaction > 0)
            return;
        try {
            const data = this.sqlDb.export();
            const buffer = Buffer.from(data);
            fs_1.default.writeFileSync(this.dbPath, buffer);
        }
        catch (e) {
            console.error('Failed to save database:', e);
        }
    }
    close() {
        this.save();
        this.sqlDb.close();
    }
}
class PreparedStatement {
    sqlDb;
    sql;
    wrapper;
    constructor(sqlDb, sql, wrapper) {
        this.sqlDb = sqlDb;
        this.sql = sql;
        this.wrapper = wrapper;
    }
    run(...params) {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        this.sqlDb.run(this.sql, flatParams);
        const lastId = this.sqlDb.exec('SELECT last_insert_rowid() as id')[0]?.values[0]?.[0] || 0;
        const changes = this.sqlDb.getRowsModified();
        this.wrapper.save();
        return { lastInsertRowid: lastId, changes };
    }
    get(...params) {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        try {
            const stmt = this.sqlDb.prepare(this.sql);
            stmt.bind(flatParams);
            if (stmt.step()) {
                const columns = stmt.getColumnNames();
                const values = stmt.get();
                stmt.free();
                const row = {};
                columns.forEach((col, i) => {
                    row[col] = values[i];
                });
                return row;
            }
            stmt.free();
            return undefined;
        }
        catch {
            return undefined;
        }
    }
    all(...params) {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        try {
            const results = this.sqlDb.exec(this.sql, flatParams);
            if (!results.length)
                return [];
            const columns = results[0].columns;
            return results[0].values.map((row) => {
                const obj = {};
                columns.forEach((col, i) => {
                    obj[col] = row[i];
                });
                return obj;
            });
        }
        catch {
            return [];
        }
    }
}
let dbInstance = null;
let initPromise = null;
function getDb() {
    if (!dbInstance) {
        throw new Error('Database not initialized. Call initDb() first.');
    }
    return dbInstance;
}
async function initDb() {
    if (dbInstance)
        return dbInstance;
    if (initPromise) {
        await initPromise;
        return dbInstance;
    }
    initPromise = (async () => {
        const SQL = await (0, sql_js_1.default)();
        const dataDir = path_1.default.resolve(__dirname, '../../data');
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        const dbPath = process.env.DB_PATH
            ? path_1.default.resolve(process.cwd(), process.env.DB_PATH)
            : path_1.default.join(dataDir, 'lingvoprep.db');
        let sqlDb;
        if (fs_1.default.existsSync(dbPath)) {
            const fileBuffer = fs_1.default.readFileSync(dbPath);
            sqlDb = new SQL.Database(fileBuffer);
        }
        else {
            sqlDb = new SQL.Database();
        }
        dbInstance = new DatabaseWrapper(sqlDb, dbPath);
        // Create tables
        dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        phone TEXT,
        target_band REAL DEFAULT 7.0,
        study_hours_per_day INTEGER DEFAULT 1,
        ielts_date TEXT,
        email_notifications INTEGER DEFAULT 1,
        language TEXT DEFAULT 'en',
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);
        dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        test_id TEXT NOT NULL,
        skill TEXT NOT NULL,
        score REAL,
        answers TEXT,
        completed_at TEXT DEFAULT (datetime('now'))
      );
    `);
        dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS lesson_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        lesson_id TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        score REAL,
        completed_at TEXT
      );
    `);
        dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        skill TEXT NOT NULL,
        duration_minutes INTEGER DEFAULT 60,
        total_questions INTEGER DEFAULT 40,
        difficulty TEXT DEFAULT 'Medium',
        description TEXT,
        sections_json TEXT NOT NULL
      );
    `);
        dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS lessons (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        level TEXT NOT NULL,
        skill TEXT NOT NULL,
        duration_minutes INTEGER DEFAULT 20,
        order_index INTEGER DEFAULT 1,
        description TEXT,
        content_json TEXT NOT NULL
      );
    `);
        // Create indexes
        dbInstance.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id);
      CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
      CREATE INDEX IF NOT EXISTS idx_tests_skill ON tests(skill);
      CREATE INDEX IF NOT EXISTS idx_lessons_level ON lessons(level);
    `);
        // Seed tests if table is empty
        const testCount = dbInstance.prepare('SELECT COUNT(*) as count FROM tests').get();
        if (testCount.count === 0) {
            console.log(`Seeding ${seedTests_1.seedTests.length} IELTS tests...`);
            const insertManyTests = dbInstance.transaction((tests) => {
                for (const t of tests) {
                    dbInstance.prepare(`
            INSERT INTO tests (id, title, skill, duration_minutes, total_questions, difficulty, description, sections_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).run(t.id, t.title, t.skill, t.durationMinutes, t.totalQuestions, t.difficulty, t.description, JSON.stringify(t.sections));
                }
            });
            insertManyTests(seedTests_1.seedTests);
            console.log(`Successfully seeded ${seedTests_1.seedTests.length} tests.`);
        }
        // Seed lessons if table is empty
        const lessonCount = dbInstance.prepare('SELECT COUNT(*) as count FROM lessons').get();
        if (lessonCount.count === 0) {
            console.log(`Seeding ${seedLessons_1.seedLessons.length} lessons...`);
            const insertManyLessons = dbInstance.transaction((lessons) => {
                for (const l of lessons) {
                    dbInstance.prepare(`
            INSERT INTO lessons (id, title, level, skill, duration_minutes, order_index, description, content_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).run(l.id, l.title, l.level, l.skill, l.durationMinutes, l.orderIndex, l.description, JSON.stringify(l.content));
                }
            });
            insertManyLessons(seedLessons_1.seedLessons);
            console.log(`Successfully seeded ${seedLessons_1.seedLessons.length} lessons.`);
        }
        // Seed demo user
        const demoUser = dbInstance.prepare('SELECT id FROM users WHERE email = ?').get('demo@lingvoprep.com');
        if (!demoUser) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync('demo123456', salt);
            const demoInsert = dbInstance.prepare(`
        INSERT INTO users (name, email, password_hash, phone, target_band, study_hours_per_day, ielts_date, email_notifications, language)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run('Demo Student', 'demo@lingvoprep.com', hash, '+1234567890', 7.5, 2, '2026-12-15', 1, 'en');
            const demoUserId = demoInsert.lastInsertRowid;
            dbInstance.prepare(`
        INSERT INTO test_results (user_id, test_id, skill, score, answers, completed_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
      `).run(demoUserId, 'reading-79', 'reading', 7.5, JSON.stringify({ 'r79-q1': 'B', 'r79-q2': 'FALSE' }), '-10 days');
            dbInstance.prepare(`
        INSERT INTO test_results (user_id, test_id, skill, score, answers, completed_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
      `).run(demoUserId, 'listening-79', 'listening', 8.0, JSON.stringify({ 'l79-q1': 'November', 'l79-q2': '850' }), '-7 days');
            dbInstance.prepare(`
        INSERT INTO test_results (user_id, test_id, skill, score, answers, completed_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
      `).run(demoUserId, 'writing-79', 'writing', 6.5, JSON.stringify({ 'w79-q1': 'Sample essay response' }), '-4 days');
            dbInstance.prepare(`
        INSERT INTO test_results (user_id, test_id, skill, score, answers, completed_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
      `).run(demoUserId, 'speaking-79', 'speaking', 7.0, JSON.stringify({ 's79-q1': 'Sample speaking transcript' }), '-2 days');
            dbInstance.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, completed, score, completed_at)
        VALUES (?, ?, 1, ?, datetime('now', ?))
      `).run(demoUserId, 'lesson-a1-1', 100, '-12 days');
            dbInstance.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, completed, score, completed_at)
        VALUES (?, ?, 1, ?, datetime('now', ?))
      `).run(demoUserId, 'lesson-a1-2', 95, '-11 days');
            dbInstance.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, completed, score, completed_at)
        VALUES (?, ?, 1, ?, datetime('now', ?))
      `).run(demoUserId, 'lesson-b1-1', 90, '-6 days');
            dbInstance.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, completed, score, completed_at)
        VALUES (?, ?, 1, ?, datetime('now', ?))
      `).run(demoUserId, 'lesson-b2-1', 85, '-3 days');
        }
        console.log('Database initialized successfully.');
    })();
    await initPromise;
    return dbInstance;
}
