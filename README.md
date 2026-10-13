# 👑 Janardhan Devarala — AI Engineer & Full-Stack Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-janardhan--devarala--portfolio.netlify.app-F59E0B?style=for-the-badge&logo=netlify&logoColor=black)](https://janardhan-devarala-portfolio.netlify.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Cloud_Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

An interactive, high-performance portfolio website built for **Janardhan Devarala** (B.Tech AI Student & Python / Full-Stack Developer). Built around a **Gold & Obsidian Black** luxury design system, featuring an **AI Portfolio Voice Assistant**, interactive **Dev PlaySpace (4 Developer Mini-Games)**, and a **Dual Database (MongoDB Cloud + SQLite)** backend.

---

## 🚀 Live Links & Repositories

- 🌐 **Official Live Website**: [https://janardhan-devarala-portfolio.netlify.app](https://janardhan-devarala-portfolio.netlify.app)
- 🐙 **GitHub Repository**: [https://github.com/janardhan-d/Portfolio](https://github.com/janardhan-d/Portfolio)
- 💻 **Local Dev Server**: `http://localhost:3000/`
- 🗄️ **Backend Database API**: `http://localhost:5000/api/stats`

---

## ✨ Core System Features & Architecture

### 🎨 1. Gold & Obsidian Black Luxury Design Token System
- **Obsidian Dark Mode**: Deep `#090d16` background with metallic gold accents (`#f59e0b`, `#fbbf24`), glassmorphic panels, and neon shimmer borders.
- **Slate Light Mode**: High-contrast slate typography on crisp light background with gold action highlights.
- Controlled via `document.documentElement` theme state manager (`useTheme.js`).

---

### 🤖 2. Jarvis AI Portfolio Voice Assistant (`JarvisBot.jsx`)
- **Real-Time Section Observing**: Automatically tracks user scroll position across `Home`, `About`, `Skills`, `Projects`, `Experience`, `Certifications`, and `Contact`.
- **Web Speech Audio Synthesis**: Speaks section summaries aloud when triggered by visitors.
- **Web Audio API Tone Chimes**: Synthesizes soft audio chimes on user interaction.
- **Live Soundwave Equalizer Animations**: Animated CSS equalizer bars indicating active voice output.

---

### 🎮 3. Dev PlaySpace (4 Interactive Mini-Games)
A dedicated developer playground (`RecruiterArcade.jsx`) designed to engage recruiters and hiring managers:
1. ⚡ **Python & AI Code Speed Typer**: A 30-second timed typing challenge testing WPM and accuracy on authentic Python syntax.
2. 🧠 **Tech Stack Memory Matcher**: A 4x3 flippable card grid matching core technical stack tiles (*Python, React, SQLite, Node.js, AI/ML, Tailwind CSS*).
3. 🤖 **GenAI Prompt Tuner**: An interactive LLM parameter laboratory where visitors adjust **Temperature** and **Top-P** settings to generate deterministic Python code without hallucinations.
4. 🐛 **Bug Smasher Arcade**: A fast-paced real-time syntax error debugger where users smash error popups before time expires.

---

### 🗄️ 4. Dual Database Architecture (`server.js`)
- **MongoDB Cloud Atlas Integration**: Automatically connects to MongoDB Cloud via `process.env.MONGO_PRIVATE_URL` or `process.env.MONGO_URI` (Mongoose schema for `ContactMessage` and `VisitorStat`).
- **SQLite Local Fallback**: Automatically defaults to local SQLite database (`database/portfolio.db`) when offline or running locally.
- **Server-Side Admin Auth (`server.js` + `AdminModal.jsx`)**: Analytics and contact-message endpoints are protected by a server-verified, expiring token issued from the `ADMIN_PIN` environment variable. The PIN never ships in client code.

### 🛡️ 5. Production Hardening
- **Rate limiting** on contact, visit, quiz, and admin-verification endpoints (`express-rate-limit`)
- **Input validation** (email format, length caps) and `helmet` security headers
- **Environment-driven API URL** (`VITE_API_URL`) so the deployed site talks to a hosted API instead of `localhost`

---

### 💼 6. Curated Capstones & Interactive Showcase (`Projects.jsx`)
Features Janardhan's authentic project capstones:
- 📊 **Finance Manager (Python Desktop GUI)**: InnoByte Services internship project built with Python Tkinter and SQLite.
- 💡 **Smart AI Quiz Hub**: AI-driven quiz application generating dynamic coding challenges.
- 📋 **DevTask Kanban**: Real-time project task management board built with React and Tailwind CSS.
- **In-App Demo Drawer (`ProjectModal.jsx`)**: Provides an interactive preview window and technical stack breakdown, eliminating 404 links.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 6 |
| **Styling & UI** | Tailwind CSS 3.4, Custom CSS Design Tokens, Lucide Icons, Canvas-Confetti |
| **AI Voice & Sound** | Web Speech API (SpeechSynthesis), Web Audio API (AudioContext) |
| **Backend API** | Node.js, Express.js (Port 5000) |
| **Cloud & Local DB** | MongoDB Cloud Atlas (Mongoose), SQLite3 (`portfolio.db`) |
| **Version Control & Deploy** | Git, GitHub (`janardhan-d/Portfolio`), Netlify, Vercel |

---

## 📂 Complete Project Directory Structure

```text
Portfolio/
├── public/
│   └── favicon.svg                 # Brand icon
├── src/
│   ├── components/
│   │   ├── About.jsx              # Education & B.Tech AI background
│   │   ├── AdminModal.jsx          # Server-verified author analytics dashboard
│   │   ├── arcade/                 # Dev PlaySpace games (one file per game)
│   │   │   ├── NeonSnake.jsx       # 60fps canvas snake
│   │   │   ├── CodeTyper.jsx       # Speed typing challenge
│   │   │   ├── StackMemory.jsx     # 3D flip memory matcher
│   │   │   ├── PromptTuner.jsx     # LLM parameter lab
│   │   │   └── BugSmasher.jsx      # Debugging arcade game
│   │   ├── Certifications.jsx      # APSCHE & CSC India DSA verified badges
│   │   ├── Contact.jsx             # Contact form submitting to MongoDB / SQLite
│   │   ├── Experience.jsx          # InnoByte Services Python Internship details
│   │   ├── Footer.jsx              # Footer links & Author DB trigger
│   │   ├── Hero.jsx                # Spotlight banner & Dev PlaySpace CTA
│   │   ├── JarvisBot.jsx           # AI Voice Assistant with soundwave equalizer
│   │   ├── Navbar.jsx              # Professional logo & Dev PlaySpace launcher
│   │   ├── OptimizedImage.jsx      # WebP-first <picture> with lazy loading
│   │   ├── ParticleCanvas.jsx      # Dynamic background particle effect
│   │   ├── ProjectModal.jsx        # Interactive proof-of-work drawer
│   │   ├── Projects.jsx            # Capstone projects showcase
│   │   ├── RecruiterArcade.jsx     # Dev PlaySpace shell (tab bar)
│   │   ├── ResumeModal.jsx         # Interactive resume viewer
│   │   └── Skills.jsx              # Technical skill bars & badges
│   ├── data/
│   │   ├── arcadeData.js           # Static game data (snippets, cards, bugs)
│   │   ├── jarvisKnowledge.js      # AI Assistant knowledge base
│   │   └── portfolioData.js        # Personal details, projects, skills
│   ├── hooks/
│   │   ├── useEscapeKey.js         # Escape-to-close modal hook
│   │   └── useTheme.js             # Dual dark/light theme manager
│   ├── lib/
│   │   └── api.js                  # API client (VITE_API_URL aware) + admin token
│   ├── App.jsx                     # Core application orchestrator
│   ├── index.css                   # Global styles & HSL gold design system
│   └── main.jsx                    # Vite React entrypoint
├── scripts/
│   └── optimize-images.mjs         # One-shot WebP conversion for public/ assets
├── server.js                       # Express backend server (MongoDB + SQLite)
├── vercel.json                     # Vercel deployment configuration
├── netlify.toml                    # Netlify deployment configuration
├── package.json                    # Project dependencies & scripts
├── .env                            # Environment variables (not committed)
└── README.md                       # Complete project documentation
```

---

## ⚙️ Local Installation & Environment Setup

Follow these steps to run the portfolio locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/janardhan-d/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create or edit the `.env` file in the root directory:
```env
# Required: choose the admin passcode for the analytics dashboard.
# Pick a new value — never reuse one that was committed to git.
ADMIN_PIN=<your-new-passcode>

# Optional: MongoDB Cloud Atlas connection string.
# Without it, the server uses the local SQLite database.
MONGO_PRIVATE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority

# Optional: where the API is hosted. The deployed site uses this
# so the contact form reaches the server from visitors' browsers.
# VITE_API_URL=https://your-api-host.example.com
PORT=5000
```

### 4. Start Database API Server
```bash
node server.js
```
*(Runs backend server on `http://localhost:5000` with MongoDB Cloud Atlas or local SQLite)*

### 5. Start Vite Development Server
```bash
npm run dev
```

---

## 🔧 Development & CI

```bash
npm run lint      # ESLint (flat config)
npm run format    # Prettier
npm run build     # Production build (Vite)
node scripts/optimize-images.mjs   # Re-encode public/ images to WebP
```

GitHub Actions (`.github/workflows/ci.yml`) runs lint + build on every push and PR.

---

## 🔒 Author Access

The analytics dashboard (`AdminModal.jsx`) is unlocked by the **`ADMIN_PIN`** environment variable on the server. It issues a 6-hour token — the passcode itself is never present in the client bundle. If a passcode was ever committed to git, rotate it: set a new `ADMIN_PIN` and remove the old value from history (`git filter-repo`).

---

## 👨‍💻 Author Information

- **Name**: Janardhan Devarala
- **Education**: Audisankara Institute of Technology, Gudur • B.Tech in Artificial Intelligence (2023 - 2027)
- **Location**: Sri Potti Sriramulu Nellore district, Andhra Pradesh, India
- **Primary Email**: `janardhand2021@gmail.com`
- **Secondary Email**: `devaralajanardhan@gmail.com`
- **Phone**: `+91 7207463004`
- **LinkedIn**: [https://www.linkedin.com/in/janardhan-devarala-1552172a1](https://www.linkedin.com/in/janardhan-devarala-1552172a1)
- **GitHub**: [https://github.com/janardhan-d](https://github.com/janardhan-d)
