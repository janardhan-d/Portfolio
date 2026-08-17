import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to local SQLite database at:', dbPath);
  }
});

// Initialize Database Tables
db.serialize(() => {
  // Contact Messages Table
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Visitor Statistics Table
  db.run(`
    CREATE TABLE IF NOT EXISTS visitor_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// API Routes

// 1. Record a Site Visit
app.post('/api/visit', (req, res) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';

  db.run(
    `INSERT INTO visitor_stats (user_agent) VALUES (?)`,
    [userAgent],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Fetch updated total visit count
      db.get(`SELECT COUNT(*) as total FROM visitor_stats`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, visitId: this.lastID, totalVisits: row.total });
      });
    }
  );
});

// 2. Fetch Visitor & Stats Summary
app.get('/api/stats', (req, res) => {
  db.get(`SELECT COUNT(*) as totalVisits FROM visitor_stats`, [], (err, visitRow) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT COUNT(*) as totalMessages FROM contact_messages`, [], (err, msgRow) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        totalVisits: visitRow.totalVisits || 0,
        totalMessages: msgRow.totalMessages || 0,
        dbLocation: dbPath
      });
    });
  });
});

// 3. Post Contact Message
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  db.run(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        messageId: this.lastID,
        message: 'Contact message saved to local SQLite database successfully!'
      });
    }
  );
});

// 4. Fetch All Saved Messages (Admin View)
app.get('/api/messages', (req, res) => {
  db.all(
    `SELECT * FROM contact_messages ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ messages: rows });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Local SQLite Portfolio Database API running on http://localhost:${PORT}`);
});
