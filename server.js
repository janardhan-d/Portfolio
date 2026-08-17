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

const ContactMessage = mongoose.model('ContactMessage', contactSchema);
const VisitorStat = mongoose.model('VisitorStat', visitSchema);

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
      return res.json({
        totalVisits,
        totalMessages,
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

      res.json({
        totalVisits: visitRow.totalVisits || 0,
        totalMessages: msgRow.totalMessages || 0,
        dbType: 'SQLite Local',
        dbLocation: dbPath
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

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Database Server running on http://localhost:${PORT}`);
  console.log(`   Status: ${isMongoConnected ? 'MongoDB Cloud Active 🍃' : 'SQLite Local Active 🗄️'}`);
});
