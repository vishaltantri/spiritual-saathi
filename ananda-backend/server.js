require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { Groq } = require('groq-sdk');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ananda-app/dist')));


// Initialize SQLite database
const db = new sqlite3.Database('./ananda.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the SQLite database.');
});

// Create messages table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Ensure some seed data exists if the table is empty
db.get("SELECT COUNT(*) as count FROM messages", (err, row) => {
  if (row && row.count === 0) {
    const seed = [
      { name: "Radha Ma", time: "09:00 AM", text: "Jai Shri Krishna! I am starting my 21-day reading of the Ramayan today." },
      { name: "Dev", time: "09:15 AM", text: "Such a beautiful morning! Has anyone watched the new emotional health video?" },
      { name: "Anand Ji", time: "09:30 AM", text: "Yes Dev, it was very comforting. Har Har Mahadev to all 🙏" }
    ];
    const stmt = db.prepare("INSERT INTO messages (name, text, time) VALUES (?, ?, ?)");
    seed.forEach(m => stmt.run(m.name, m.text, m.time));
    stmt.finalize();
  }
});

// ─── COMMUNITY CHAT ENDPOINTS ───

// Get all messages
app.get('/api/messages', (req, res) => {
  db.all("SELECT id, name, text, time FROM messages ORDER BY id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Post a new message
app.post('/api/messages', (req, res) => {
  const { name, text, time } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  
  const safeName = name || "You";
  const safeTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  db.run(`INSERT INTO messages (name, text, time) VALUES (?, ?, ?)`, [safeName, text, safeTime], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name: safeName, text, time: safeTime });
  });
});

// ─── AI CHAT ENDPOINT ───

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "missing_key" });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, religion } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Prepare system prompt based on religion
    const relLabels = {
      hinduism: "Hindu",
      islam: "Islamic",
      buddhism: "Buddhist",
      sikhism: "Sikh",
      jainism: "Jain",
      christianity: "Christian"
    };
    const faithContext = relLabels[religion] || "spiritual";
    
    const systemPrompt = `You are a warm, knowledgeable, and compassionate spiritual guide AI for elderly Indian devotees. You specialise in ${faithContext} philosophy, teachings, scriptures, and emotional well-being for seniors. Respond in simple, respectful language. Keep answers to 3-5 sentences. Be warm and encouraging. Occasionally use faith-appropriate emojis. If asked about therapy or mental health, gently encourage seeking professional help. Do not mention that you are an AI model.`;

    // Map frontend roles to Groq roles
    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text
      }))
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama-3.1-8b-instant", // Fast, versatile model
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I am here for you. Please ask again.";
    res.json({ reply });

  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from AI" });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ananda-app/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Ananda Backend listening on port ${port}`);
});
