# 👑 Janardhan Devarala — AI Engineer & Full-Stack Portfolio

An interactive, high-performance portfolio website for **Janardhan Devarala** (B.Tech AI Student & Python / Full-Stack Developer). Designed with a **Gold & Obsidian Black** luxury design system, featuring an **AI Portfolio Voice Assistant**, interactive **Dev PlaySpace (4 Developer Mini-Games)**, and a **Local SQLite Database** backend for tracking site visits and contact form submissions.

---

## 🚀 Live Links & Repositories

- 🐙 **GitHub Repository**: [https://github.com/janardhan-d/Portfolio](https://github.com/janardhan-d/Portfolio)
- 🌐 **Live Website**: Deployed permanently via Netlify / Vercel
- 💻 **Local Preview**: `http://localhost:3015/`
- 🗄️ **Local SQLite Backend**: `http://localhost:5000/api/stats`

---

## ✨ Key Features & Technical Highlights

### 🎨 1. Gold & Obsidian Design Tokens (Dual Theme Support)
- **Obsidian Black Theme**: Deep `#090d16` background with metallic gold accents (`#f59e0b`, `#fbbf24`), glassmorphic panels, and neon shimmer borders.
- **Slate Light Theme**: Crisp high-contrast light theme with dark slate typography and gold action highlights.
- Controlled seamlessly via `document.documentElement` class state (`useTheme.js`).

---

### 🤖 2. Jarvis AI Portfolio Assistant (`JarvisBot.jsx`)
- **Real-Time Section Observing**: Automatically tracks user scroll position across `Home`, `About`, `Skills`, `Projects`, `Experience`, `Certifications`, and `Contact`.
- **Web Speech Audio Synthesis**: Speaks section summaries aloud when triggered by visitors.
- **Web Audio API Tone Chimes**: Synthesizes soft sine-wave audio tones on interaction.
- **Live Soundwave Equalizer Animations**: Animated CSS bars indicating active speech output.

---

### 🎮 3. Dev PlaySpace (4 Interactive Mini-Games)
A dedicated developer playground (`RecruiterArcade.jsx`) designed to engage recruiters and hiring managers:
1. ⚡ **Python & AI Code Speed Typer**: A 30-second timed typing challenge testing WPM and accuracy on authentic Python syntax.
2. 🧠 **Tech Stack Memory Matcher**: A 4x3 flippable card grid matching core technical stack tiles (*Python, React, SQLite, Node.js, AI/ML, Tailwind CSS*).
3. 🤖 **GenAI Prompt Tuner**: An interactive LLM parameter laboratory where visitors adjust **Temperature** and **Top-P** settings to generate deterministic Python code without hallucinations.
4. 🐛 **Bug Smasher Arcade**: A fast-paced real-time syntax debugger where users smash error popups before time expires.

---

### 🗄️ 4. Express + SQLite Local Backend (`server.js` + `portfolio.db`)
- **Visitor Statistics Counter**: Automatically logs page visits into `portfolio.db` via `POST /api/visit`.
- **Contact Submissions Table**: Saves contact form entries into `contact_messages` table via `POST /api/contact`.
- **Author Security Lock Screen (`AdminModal.jsx`)**: Protects visitor analytics and contact form messages behind an Author Security Passcode (**`102308`**).

---

### 💼 5. Curated Capstones & Interactive Preview Modal (`Projects.jsx`)
Features Janardhan's authentic project capstones:
- 📊 **Finance Manager (Python Desktop GUI)**: InnoByte Services internship project built with Python Tkinter and SQLite.
- 💡 **Smart AI Quiz Hub**: AI-driven quiz application generating dynamic coding challenges.
- 📋 **DevTask Kanban**: Real-time project task management board built with React and Tailwind CSS.
- **In-App Demo Drawer (`ProjectModal.jsx`)**: Provides an interactive preview window and technical stack breakdown, eliminating 404 links.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 18, Vite, Tailwind CSS, Lucide React, Canvas-Confetti |
| **Styling** | Custom CSS Tokens, Glassmorphism, HSL Gold Gradients |
| **AI & Web Audio** | Web Speech API (SpeechSynthesis), Web Audio API (AudioContext) |
| **Backend & DB** | Node.js, Express.js, SQLite3 (`portfolio.db`) |
| **Version Control** | Git, GitHub |
| **Deployment** | Netlify, Vercel |

---

## 📂 Project Directory Structure

```text
Portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.jsx              # Education & B.Tech AI background
│   │   ├── AdminModal.jsx          # Author PIN lock (102308) & SQLite stats
│   │   ├── Certifications.jsx      # APSCHE & CSC India DSA verified badges
│   │   ├── Contact.jsx             # Contact form submitting to SQLite
│   │   ├── Experience.jsx          # InnoByte Services Python Internship details
│   │   ├── Footer.jsx              # Footer links & Author DB trigger
│   │   ├── Hero.jsx                # Spotlight banner & Dev PlaySpace CTA
│   │   ├── JarvisBot.jsx           # AI Voice Assistant with soundwave equalizer
│   │   ├── Navbar.jsx              # Professional logo & Dev PlaySpace launcher
│   │   ├── ParticleCanvas.jsx      # Dynamic background particle effect
│   │   ├── ProjectModal.jsx        # Interactive proof-of-work drawer
│   │   ├── Projects.jsx            # Capstone projects showcase
│   │   ├── RecruiterArcade.jsx     # Dev PlaySpace (4 mini-games)
│   │   ├── ResumeModal.jsx         # Interactive resume viewer
│   │   └── Skills.jsx              # Technical skill bars & badges
│   ├── data/
│   │   ├── jarvisKnowledge.js      # AI Assistant knowledge base
│   │   └── portfolioData.js        # Personal details, projects, skills
│   ├── hooks/
│   │   └── useTheme.js             # Dual dark/light theme manager
│   ├── App.jsx                     # Core application orchestrator
│   ├── index.css                   # Global styles & HSL gold design system
│   └── main.jsx                    # Vite React entrypoint
├── database/
│   └── portfolio.db                # SQLite database file
├── server.js                       # Express backend API server (Port 5000)
├── vercel.json                     # Vercel deployment configuration
├── netlify.toml                    # Netlify deployment configuration
├── package.json                    # Project dependencies & scripts
└── README.md                       # Project documentation
```

---

## ⚙️ Local Installation & Setup

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

### 3. Start Local SQLite Database Server
```bash
node server.js
```
*(Runs backend server on `http://localhost:5000` and creates `portfolio.db` if missing)*

### 4. Start Vite Development Server
```bash
npm run dev
```
*(Opens application in browser, typically at `http://localhost:3000` or next available port)*

---

## 🔒 Author Security Passcode

- **Author PIN**: `102308`
- **Purpose**: Unlocks the Author Control & Visitor Analytics dashboard (`AdminModal.jsx`) to review messages saved in `portfolio.db`.

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
