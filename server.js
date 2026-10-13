import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_PRIVATE_URL || process.env.MONGO_URI;
const adminPin = process.env.ADMIN_PIN; // Server-side secret — never ship a PIN in client code

// --- Security middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // reject oversized bodies up front

// --- Rate limits ---
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' }
});

const visitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // brute-force protection for PIN verification
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please wait before trying again.' }
});

let isMongoConnected = false;

// Mongoose Schemas (for MongoDB Cloud Atlas)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const visitSchema = new mongoose.Schema({
  user_agent: { type: String, default: 'Unknown' },
  created_at: { type: Date, default: Date.now }
});

const quizResultSchema = new mongoose.Schema({
  topic_id: { type: String, required: true },
  topic_name: { type: String, required: true },
  difficulty: { type: String, required: true },
  score: { type: Number, required: true },
  total_questions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  time_spent_seconds: { type: Number, default: 0 },
  ai_evaluation: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);
const VisitorStat = mongoose.model('VisitorStat', visitSchema);
const QuizResult = mongoose.model('QuizResult', quizResultSchema);

// Try MongoDB Connection if URL provided
if (mongoUrl) {
  mongoose.connect(mongoUrl)
    .then(() => {
      isMongoConnected = true;
      console.log('🍃 Connected successfully to MongoDB Cloud Database!');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection error, falling back to local SQLite:', err.message);
    });
}

// SQLite Database Setup (Fallback / Default)
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('🗄️ Connected to local SQLite database at:', dbPath);
  }
});

// Initialize SQLite Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS visitor_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id TEXT NOT NULL,
      topic_name TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      time_spent_seconds INTEGER DEFAULT 0,
      ai_evaluation TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// --- SQLite promise wrappers ---
const runSql = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID });
    }));

const getSql = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row))));

const allSql = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows))));

// --- Unified Data Store ---
// Every route goes through this adapter, so the MongoDB / SQLite branch
// lives in one place instead of being duplicated per endpoint.
const store = {
  async recordVisit(userAgent) {
    if (isMongoConnected) {
      try {
        await VisitorStat.create({ user_agent: userAgent });
        return { dbType: 'MongoDB', totalVisits: await VisitorStat.countDocuments() };
      } catch (err) {
        console.error('MongoDB visit error:', err);
      }
    }
    const { lastID } = await runSql(`INSERT INTO visitor_stats (user_agent) VALUES (?)`, [userAgent]);
    const row = await getSql(`SELECT COUNT(*) as total FROM visitor_stats`);
    return { dbType: 'SQLite', visitId: lastID, totalVisits: row.total };
  },

  async getStats() {
    if (isMongoConnected) {
      try {
        const [totalVisits, totalMessages, totalQuizzes] = await Promise.all([
          VisitorStat.countDocuments(),
          ContactMessage.countDocuments(),
          QuizResult.countDocuments()
        ]);
        return { totalVisits, totalMessages, totalQuizzes, dbType: 'MongoDB Cloud', dbLocation: 'MongoDB Atlas' };
      } catch (err) {
        console.error('MongoDB stats error:', err);
      }
    }
    const visits = await getSql(`SELECT COUNT(*) as totalVisits FROM visitor_stats`);
    const messages = await getSql(`SELECT COUNT(*) as totalMessages FROM contact_messages`);
    const quizzes = await getSql(`SELECT COUNT(*) as totalQuizzes FROM quiz_results`);
    return {
      totalVisits: visits.totalVisits || 0,
      totalMessages: messages.totalMessages || 0,
      totalQuizzes: quizzes.totalQuizzes || 0,
      dbType: 'SQLite Local',
      dbLocation: dbPath
    };
  },

  async createContact({ name, email, message }) {
    if (isMongoConnected) {
      try {
        const newMsg = await ContactMessage.create({ name, email, message });
        return { dbType: 'MongoDB Cloud', messageId: String(newMsg._id) };
      } catch (err) {
        console.error('MongoDB contact error:', err);
      }
    }
    const { lastID } = await runSql(
      `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message]
    );
    return { dbType: 'SQLite Local', messageId: lastID };
  },

  async getMessages(limit = 100) {
    if (isMongoConnected) {
      try {
        const messages = await ContactMessage.find().sort({ created_at: -1 }).limit(limit);
        return { dbType: 'MongoDB Cloud', messages: messages.map(m => ({ ...m.toObject(), id: String(m._id) })) };
      } catch (err) {
        console.error('MongoDB fetch messages error:', err);
      }
    }
    const messages = await allSql(`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ?`, [limit]);
    return { dbType: 'SQLite Local', messages };
  },

  async submitQuiz({ topicId, topicName, difficulty, score, totalQuestions, percentage, timeSpentSeconds, aiEvaluation }) {
    if (isMongoConnected) {
      try {
        const result = await QuizResult.create({
          topic_id: topicId,
          topic_name: topicName,
          difficulty,
          score,
          total_questions: totalQuestions,
          percentage,
          time_spent_seconds: timeSpentSeconds,
          ai_evaluation: aiEvaluation
        });
        return { dbType: 'MongoDB Cloud', quizId: String(result._id) };
      } catch (err) {
        console.error('MongoDB Quiz Submit Error:', err);
      }
    }
    const { lastID } = await runSql(
      `INSERT INTO quiz_results (topic_id, topic_name, difficulty, score, total_questions, percentage, time_spent_seconds, ai_evaluation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [topicId, topicName, difficulty, score, totalQuestions, percentage, timeSpentSeconds, aiEvaluation]
    );
    return { dbType: 'SQLite Local', quizId: lastID };
  },

  async getQuizHistory(limit = 20) {
    if (isMongoConnected) {
      try {
        const history = await QuizResult.find().sort({ created_at: -1 }).limit(limit);
        return { dbType: 'MongoDB Cloud', history: history.map(h => ({ ...h.toObject(), id: String(h._id) })) };
      } catch (err) {
        console.error('MongoDB Quiz History Error:', err);
      }
    }
    const history = await allSql(`SELECT * FROM quiz_results ORDER BY created_at DESC LIMIT ?`, [limit]);
    return { dbType: 'SQLite Local', history };
  }
};

// --- Admin auth (server-side) ---
// Stateless HMAC token: the PIN never leaves the server, and the token expires.
const TOKEN_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

function issueAdminToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  const signature = crypto.createHmac('sha256', adminPin).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyAdminToken(token) {
  if (!adminPin || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = crypto.createHmac('sha256', adminPin).update(payload).digest('base64url');
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (verifyAdminToken(token)) return next();
  return res.status(401).json({ error: 'Unauthorized. Verify the author PIN first.' });
}

// --- Input validation ---
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 100;
const MAX_MESSAGE_LEN = 2000;

function validateContact(body) {
  const { name, email, message } = body ?? {};
  const errors = [];
  if (typeof name !== 'string' || !name.trim()) errors.push('Name is required.');
  else if (name.length > MAX_NAME_LEN) errors.push(`Name must be ${MAX_NAME_LEN} characters or fewer.`);
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) errors.push('A valid email address is required.');
  if (typeof message !== 'string' || !message.trim()) errors.push('Message is required.');
  else if (message.length > MAX_MESSAGE_LEN) errors.push(`Message must be ${MAX_MESSAGE_LEN} characters or fewer.`);
  return errors;
}

function validateQuiz(body) {
  const {
    topicId, topicName, difficulty, score, totalQuestions, percentage, timeSpentSeconds, aiEvaluation
  } = body ?? {};
  const errors = [];
  if (typeof topicId !== 'string' || topicId.length > 64) errors.push('Invalid topic ID.');
  if (typeof topicName !== 'string' || topicName.length > 120) errors.push('Invalid topic name.');
  if (typeof difficulty !== 'string' || difficulty.length > 40) errors.push('Invalid difficulty.');
  if (!Number.isFinite(score) || score < 0) errors.push('Invalid score.');
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) errors.push('Invalid question count.');
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) errors.push('Invalid percentage.');
  if (!Number.isFinite(timeSpentSeconds) || timeSpentSeconds < 0) errors.push('Invalid time spent.');
  if (aiEvaluation != null && (typeof aiEvaluation !== 'string' || aiEvaluation.length > 5000)) {
    errors.push('Invalid AI evaluation.');
  }
  return errors;
}

const quizLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});

// --- API Routes ---

// 0. Author PIN verification -> short-lived admin token
app.post('/api/admin/verify', adminLimiter, async (req, res) => {
  if (!adminPin) {
    return res.status(503).json({ error: 'Admin access is not configured on this server (ADMIN_PIN not set).' });
  }
  const { pin } = req.body ?? {};
  const pinOk = typeof pin === 'string'
    && pin.length === adminPin.length
    && crypto.timingSafeEqual(Buffer.from(pin), Buffer.from(adminPin));
  if (!pinOk) {
    return res.status(401).json({ error: 'Incorrect Author Passcode. Access Denied.' });
  }
  res.json({ success: true, token: issueAdminToken(), expiresInSeconds: TOKEN_TTL_MS / 1000 });
});

// 1. Record a Site Visit
app.post('/api/visit', visitLimiter, async (req, res) => {
  const userAgent = (req.headers['user-agent'] || 'Unknown').slice(0, 500);
  try {
    const result = await store.recordVisit(userAgent);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Visit record error:', err);
    res.status(500).json({ error: 'Failed to record visit.' });
  }
});

// 2. Fetch Visitor & Stats Summary (admin only)
app.get('/api/stats', requireAdmin, async (req, res) => {
  try {
    res.json(await store.getStats());
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to load stats.' });
  }
});

// 3. Post Contact Message
app.post('/api/contact', contactLimiter, async (req, res) => {
  const errors = validateContact(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(' ') });

  const { name, email, message } = req.body;
  try {
    const result = await store.createContact({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.json({
      success: true,
      ...result,
      message: 'Contact message saved successfully!'
    });
  } catch (err) {
    console.error('Contact save error:', err);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// 4. Fetch All Saved Messages (Admin View)
app.get('/api/messages', requireAdmin, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 100, 500);
  try {
    res.json(await store.getMessages(limit));
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: 'Failed to load messages.' });
  }
});

// 5. Submit Completed Quiz Result
app.post('/api/quiz/submit', quizLimiter, async (req, res) => {
  const errors = validateQuiz(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(' ') });

  const { topicId, topicName, difficulty, score, totalQuestions, percentage, timeSpentSeconds, aiEvaluation } = req.body;
  try {
    const result = await store.submitQuiz({
      topicId: topicId || 'general',
      topicName: topicName || 'General CS',
      difficulty: difficulty || 'Intermediate',
      score: score ?? 0,
      totalQuestions: totalQuestions || 5,
      percentage: percentage ?? 0,
      timeSpentSeconds: timeSpentSeconds || 0,
      aiEvaluation: aiEvaluation || ''
    });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ error: 'Failed to save quiz result.' });
  }
});

// 6. Fetch Quiz History / Attempts (admin only)
app.get('/api/quiz/history', requireAdmin, async (req, res) => {
  try {
    res.json(await store.getQuizHistory());
  } catch (err) {
    console.error('Quiz history error:', err);
    res.status(500).json({ error: 'Failed to load quiz history.' });
  }
});

// Health check (used by hosting platforms and CI)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, dbType: isMongoConnected ? 'MongoDB Cloud' : 'SQLite Local' });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Database Server running on http://localhost:${PORT}`);
  console.log(`   Status: ${isMongoConnected ? 'MongoDB Cloud Active 🍃' : 'SQLite Local Active 🗄️'}`);
  console.log(`   Admin API: ${adminPin ? 'enabled (ADMIN_PIN set)' : 'DISABLED — set ADMIN_PIN to unlock'}`);
});
