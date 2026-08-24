import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_PRIVATE_URL || process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

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

// --- API Routes (Handles both MongoDB & SQLite) ---

// 1. Record a Site Visit
app.post('/api/visit', async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';

  if (isMongoConnected) {
    try {
      await VisitorStat.create({ user_agent: userAgent });
      const totalVisits = await VisitorStat.countDocuments();
      return res.json({ success: true, dbType: 'MongoDB', totalVisits });
    } catch (err) {
      console.error('MongoDB visit error:', err);
    }
  }

  // SQLite Fallback
  db.run(
    `INSERT INTO visitor_stats (user_agent) VALUES (?)`,
    [userAgent],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT COUNT(*) as total FROM visitor_stats`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, dbType: 'SQLite', visitId: this.lastID, totalVisits: row.total });
      });
    }
  );
});

// 2. Fetch Visitor & Stats Summary
app.get('/api/stats', async (req, res) => {
  if (isMongoConnected) {
    try {
      const totalVisits = await VisitorStat.countDocuments();
      const totalMessages = await ContactMessage.countDocuments();
      const totalQuizzes = await QuizResult.countDocuments();
      return res.json({
        totalVisits,
        totalMessages,
        totalQuizzes,
        dbType: 'MongoDB Cloud',
        dbLocation: 'MongoDB Atlas'
      });
    } catch (err) {
      console.error('MongoDB stats error:', err);
    }
  }

  // SQLite Fallback
  db.get(`SELECT COUNT(*) as totalVisits FROM visitor_stats`, [], (err, visitRow) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT COUNT(*) as totalMessages FROM contact_messages`, [], (err, msgRow) => {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT COUNT(*) as totalQuizzes FROM quiz_results`, [], (err, quizRow) => {
        res.json({
          totalVisits: visitRow.totalVisits || 0,
          totalMessages: msgRow.totalMessages || 0,
          totalQuizzes: (quizRow && quizRow.totalQuizzes) || 0,
          dbType: 'SQLite Local',
          dbLocation: dbPath
        });
      });
    });
  });
});

// 3. Post Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  if (isMongoConnected) {
    try {
      const newMsg = await ContactMessage.create({ name, email, message });
      return res.json({
        success: true,
        dbType: 'MongoDB Cloud',
        messageId: newMsg._id,
        message: 'Contact message saved to MongoDB Cloud Database successfully!'
      });
    } catch (err) {
      console.error('MongoDB contact error:', err);
    }
  }

  // SQLite Fallback
  db.run(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        success: true,
        dbType: 'SQLite Local',
        messageId: this.lastID,
        message: 'Contact message saved to local SQLite database successfully!'
      });
    }
  );
});

// 4. Fetch All Saved Messages (Admin View)
app.get('/api/messages', async (req, res) => {
  if (isMongoConnected) {
    try {
      const messages = await ContactMessage.find().sort({ created_at: -1 });
      return res.json({ dbType: 'MongoDB Cloud', messages });
    } catch (err) {
      console.error('MongoDB fetch messages error:', err);
    }
  }

  // SQLite Fallback
  db.all(
    `SELECT * FROM contact_messages ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ dbType: 'SQLite Local', messages: rows });
    }
  );
});

// --- Smart AI Quiz Hub Backend Endpoints ---

// 5. Submit Completed Quiz Result & Save to DB
app.post('/api/quiz/submit', async (req, res) => {
  const { topicId, topicName, difficulty, score, totalQuestions, percentage, timeSpentSeconds, aiEvaluation } = req.body;

  if (isMongoConnected) {
    try {
      const result = await QuizResult.create({
        topic_id: topicId || 'general',
        topic_name: topicName || 'General CS',
        difficulty: difficulty || 'Intermediate',
        score: score || 0,
        total_questions: totalQuestions || 5,
        percentage: percentage || 0,
        time_spent_seconds: timeSpentSeconds || 0,
        ai_evaluation: aiEvaluation || ''
      });
      return res.json({ success: true, dbType: 'MongoDB Cloud', quizId: result._id });
    } catch (err) {
      console.error('MongoDB Quiz Submit Error:', err);
    }
  }

  // SQLite Fallback
  db.run(
    `INSERT INTO quiz_results (topic_id, topic_name, difficulty, score, total_questions, percentage, time_spent_seconds, ai_evaluation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      topicId || 'general',
      topicName || 'General CS',
      difficulty || 'Intermediate',
      score || 0,
      totalQuestions || 5,
      percentage || 0,
      timeSpentSeconds || 0,
      aiEvaluation || ''
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, dbType: 'SQLite Local', quizId: this.lastID });
    }
  );
});

// 6. Fetch Quiz History / Attempts
app.get('/api/quiz/history', async (req, res) => {
  if (isMongoConnected) {
    try {
      const history = await QuizResult.find().sort({ created_at: -1 }).limit(20);
      return res.json({ dbType: 'MongoDB Cloud', history });
    } catch (err) {
      console.error('MongoDB Quiz History Error:', err);
    }
  }

  // SQLite Fallback
  db.all(
    `SELECT * FROM quiz_results ORDER BY created_at DESC LIMIT 20`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ dbType: 'SQLite Local', history: rows || [] });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Database Server running on http://localhost:${PORT}`);
  console.log(`   Status: ${isMongoConnected ? 'MongoDB Cloud Active 🍃' : 'SQLite Local Active 🗄️'}`);
});
