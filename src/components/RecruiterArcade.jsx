import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Gamepad2, 
  X, 
  Sparkles, 
  Trophy, 
  Timer, 
  Zap, 
  RotateCcw, 
  Brain,
  Bug,
  Flame,
  CheckCircle2,
  Sliders,
  Terminal,
  Play,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause,
  Gauge,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Game 1 Snippets
const codeSnippets = [
  "import sqlite3",
  "def train_model(x, y):",
  "const [state, setState] = useState()",
  "fig, ax = plt.subplots()",
  "app.get('/api/stats', (req, res))",
  "import torch.nn as nn",
  "cursor.execute('SELECT * FROM visits')",
  "export default function App()",
  "np.linspace(0, 10, num=50)",
  "df.groupby('category').mean()"
];

// Game 2 Memory Cards
const memoryCardsList = [
  { id: 1, name: 'Python', icon: '🐍' },
  { id: 2, name: 'React', icon: '⚛️' },
  { id: 3, name: 'SQLite', icon: '🗄️' },
  { id: 4, name: 'Node.js', icon: '🟢' },
  { id: 5, name: 'AI / ML', icon: '🤖' },
  { id: 6, name: 'Tailwind', icon: '🎨' },
];

// Game 3 Prompt Challenges
const promptChallenges = [
  {
    id: 1,
    title: "Optimize LLM Code Generator",
    description: "Adjust Temperature and Top-P to make LLM output deterministic Python code without hallucinations.",
    optimalTemp: 0.2,
    optimalTopP: 0.9,
    task: "Set Temperature <= 0.3 and Top-P >= 0.8 for deterministic Python code."
  },
  {
    id: 2,
    title: "Creative Storytelling AI",
    description: "Adjust settings to generate imaginative AI responses for interactive dialogue.",
    optimalTemp: 0.85,
    optimalTopP: 0.95,
    task: "Set Temperature >= 0.7 for high creative variance."
  }
];

// Game 4 Bugs List
const bugItemsList = [
  { id: 1, label: "SyntaxError: missing ':'", type: "syntax" },
  { id: 2, label: "Uncaught ReferenceError: x is not defined", type: "reference" },
  { id: 3, label: "TypeError: Cannot read property 'map' of undefined", type: "type" },
  { id: 4, label: "IndentationError: unexpected indent", type: "indent" },
  { id: 5, label: "UnhandledPromiseRejection: Missing await", type: "async" },
  { id: 6, label: "RecursionError: maximum depth exceeded", type: "recursion" },
];

export default function RecruiterArcade({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('snake');

  // ==========================================
  // --- GAME 1: 60FPS CANVAS NEON SNAKE ---
  // ==========================================
  const canvasRef = useRef(null);
  const GRID_SIZE = 16;
  const CELL_PX = 24; // 16 * 24 = 384px canvas

  const [snake, setSnake] = useState([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 }
  ]);
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [isGoldFood, setIsGoldFood] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [difficulty, setDifficulty] = useState('normal'); // 'easy', 'normal', 'hard'
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake_highscore') || '0', 10);
  });
  const [snakeRunning, setSnakeRunning] = useState(false);
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [floatingScore, setFloatingScore] = useState(null); // { text, x, y, id }

  const directionRef = useRef('RIGHT');
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const isGoldFoodRef = useRef(isGoldFood);
  const difficultyRef = useRef(difficulty);
  const scoreRef = useRef(snakeScore);

  snakeRef.current = snake;
  foodRef.current = food;
  isGoldFoodRef.current = isGoldFood;
  difficultyRef.current = difficulty;
  scoreRef.current = snakeScore;

  const speedMap = {
    easy: 190,
    normal: 130,
    hard: 75
  };

  const changeSnakeDirection = useCallback((newDir) => {
    const opposites = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    if (opposites[newDir] !== directionRef.current) {
      directionRef.current = newDir;
      setDirection(newDir);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || activeTab !== 'snake') return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('UP');
      } else if (['ArrowDown', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('DOWN');
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('LEFT');
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, changeSnakeDirection]);

  // Touch Swipe Gesture Detection on Canvas
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length > 0) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) changeSnakeDirection('RIGHT');
        else if (dx < -30) changeSnakeDirection('LEFT');
      } else {
        if (dy > 30) changeSnakeDirection('DOWN');
        else if (dy < -30) changeSnakeDirection('UP');
      }
    }
  };

  // Canvas Drawing Routine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = GRID_SIZE * CELL_PX;
    const height = GRID_SIZE * CELL_PX;

    // Background
    ctx.fillStyle = '#020617'; // slate-950
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_PX, 0);
      ctx.lineTo(i * CELL_PX, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_PX);
      ctx.lineTo(width, i * CELL_PX);
      ctx.stroke();
    }

    // Food rendering with aura
    const f = foodRef.current;
    const isGold = isGoldFoodRef.current;
    const fx = f.x * CELL_PX + CELL_PX / 2;
    const fy = f.y * CELL_PX + CELL_PX / 2;

    ctx.save();
    ctx.shadowBlur = isGold ? 18 : 12;
    ctx.shadowColor = isGold ? '#fde047' : '#f43f5e';
    ctx.fillStyle = isGold ? '#fbbf24' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(fx, fy, CELL_PX * 0.38, 0, Math.PI * 2);
    ctx.fill();

    // Food highlight reflection
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(fx - 3, fy - 3, CELL_PX * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Snake rendering
    const currentSnake = snakeRef.current;
    currentSnake.forEach((seg, idx) => {
      const isHead = idx === 0;
      const sx = seg.x * CELL_PX;
      const sy = seg.y * CELL_PX;

      ctx.save();
      if (isHead) {
        // Glowing head
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#f59e0b';
        ctx.fillStyle = '#fbbf24';

        // Rounded head
        const radius = 6;
        ctx.beginPath();
        ctx.roundRect(sx + 2, sy + 2, CELL_PX - 4, CELL_PX - 4, radius);
        ctx.fill();

        // Eyes tracking direction
        ctx.fillStyle = '#020617';
        const curDir = directionRef.current;
        let eye1 = { x: sx + 6, y: sy + 6 };
        let eye2 = { x: sx + CELL_PX - 8, y: sy + 6 };

        if (curDir === 'DOWN') {
          eye1 = { x: sx + 6, y: sy + CELL_PX - 8 };
          eye2 = { x: sx + CELL_PX - 8, y: sy + CELL_PX - 8 };
        } else if (curDir === 'LEFT') {
          eye1 = { x: sx + 6, y: sy + 6 };
          eye2 = { x: sx + 6, y: sy + CELL_PX - 8 };
        } else if (curDir === 'RIGHT') {
          eye1 = { x: sx + CELL_PX - 8, y: sy + 6 };
          eye2 = { x: sx + CELL_PX - 8, y: sy + CELL_PX - 8 };
        }

        ctx.beginPath();
        ctx.arc(eye1.x, eye1.y, 2.2, 0, Math.PI * 2);
        ctx.arc(eye2.x, eye2.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Body gradient segment
        const alpha = 1 - (idx / currentSnake.length) * 0.5;
        ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(sx + 2, sy + 2, CELL_PX - 4, CELL_PX - 4, 4);
        ctx.fill();
      }
      ctx.restore();
    });
  }, [snake, food, isGoldFood]);

  // Snake Tick Engine
  useEffect(() => {
    if (!snakeRunning || snakeGameOver) return;

    const tick = setInterval(() => {
      const prevSnake = snakeRef.current;
      const head = { ...prevSnake[0] };
      const currentDir = directionRef.current;

      if (currentDir === 'UP') head.y -= 1;
      if (currentDir === 'DOWN') head.y += 1;
      if (currentDir === 'LEFT') head.x -= 1;
      if (currentDir === 'RIGHT') head.x += 1;

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        handleSnakeGameOver();
        return;
      }

      // Self collision
      for (let seg of prevSnake) {
        if (seg.x === head.x && seg.y === head.y) {
          handleSnakeGameOver();
          return;
        }
      }

      const newSnake = [head, ...prevSnake];
      const curFood = foodRef.current;

      // Eat Food
      if (head.x === curFood.x && head.y === curFood.y) {
        const mult = difficultyRef.current === 'hard' ? 3 : difficultyRef.current === 'normal' ? 2 : 1;
        const pts = (isGoldFoodRef.current ? 30 : 10) * mult;

        setSnakeScore((s) => {
          const nextScore = s + pts;
          if (nextScore > snakeHighScore) {
            setSnakeHighScore(nextScore);
            localStorage.setItem('snake_highscore', nextScore.toString());
          }
          return nextScore;
        });

        // Trigger floating score indicator
        setFloatingScore({
          text: `+${pts}`,
          x: head.x * CELL_PX,
          y: head.y * CELL_PX,
          id: Date.now()
        });

        setTimeout(() => setFloatingScore(null), 700);

        // Generate next food
        let newX, newY;
        while (true) {
          newX = Math.floor(Math.random() * GRID_SIZE);
          newY = Math.floor(Math.random() * GRID_SIZE);
          if (!newSnake.some((seg) => seg.x === newX && seg.y === newY)) break;
        }
        setFood({ x: newX, y: newY });
        setIsGoldFood(Math.random() > 0.7);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, speedMap[difficulty]);

    return () => clearInterval(tick);
  }, [snakeRunning, snakeGameOver, snakeHighScore, difficulty]);

  const startSnakeGame = () => {
    const initialSnake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 }
    ];
    setSnake(initialSnake);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setSnakeScore(0);
    setSnakeGameOver(false);
    setSnakeRunning(true);
    setFood({ x: 12, y: 8 });
    setIsGoldFood(false);
  };

  const handleSnakeGameOver = () => {
    setSnakeRunning(false);
    setSnakeGameOver(true);
    confetti({ particleCount: 70, spread: 75 });
  };

  // ==========================================
  // --- GAME 2: SPEED TYPER WITH CHAR HIGHLIGHT ---
  // ==========================================
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [scoreWpm, setScoreWpm] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [typerGameOver, setTyperGameOver] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTyperGameOver(true);
      confetti({ particleCount: 80, spread: 70 });
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setTypedInput(val);
    if (!isTimerRunning && !typerGameOver) setIsTimerRunning(true);

    const target = codeSnippets[snippetIndex];
    if (val === target) {
      setCompletedCount((c) => c + 1);
      setScoreWpm((w) => w + Math.round(target.length * 1.5));
      setTypedInput('');
      setSnippetIndex((idx) => (idx + 1) % codeSnippets.length);
    }
  };

  const resetTyperGame = () => {
    setSnippetIndex(0);
    setTypedInput('');
    setScoreWpm(0);
    setCompletedCount(0);
    setTimeLeft(30);
    setIsTimerRunning(false);
    setTyperGameOver(false);
  };

  // ==========================================
  // --- GAME 3: 3D FLIP MEMORY MATCHER ---
  // ==========================================
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryGameOver, setMemoryGameOver] = useState(false);

  const initMemoryGame = () => {
    const duplicated = [...memoryCardsList, ...memoryCardsList].map((item, idx) => ({
      uniqueId: idx,
      ...item
    }));
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedIds([]);
    setMemoryMoves(0);
    setMemoryGameOver(false);
  };

  useEffect(() => {
    if (activeTab === 'memory') initMemoryGame();
  }, [activeTab]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedIds.includes(cards[index].uniqueId)) return;

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const first = cards[nextFlipped[0]];
      const second = cards[nextFlipped[1]];

      if (first.id === second.id) {
        setMatchedIds((prev) => {
          const updated = [...prev, first.uniqueId, second.uniqueId];
          if (updated.length === cards.length) {
            setMemoryGameOver(true);
            confetti({ particleCount: 100, spread: 80 });
          }
          return updated;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 750);
      }
    }
  };

  // ==========================================
  // --- GAME 4: LLM PROMPT TUNER WITH LIVE STREAMING ---
  // ==========================================
  const [promptIdx, setPromptIdx] = useState(0);
  const [tempVal, setTempVal] = useState(0.2);
  const [topPVal, setTopPVal] = useState(0.9);
  const [promptEvaluated, setPromptEvaluated] = useState(false);
  const [promptPassed, setPromptPassed] = useState(false);

  const evaluatePromptSettings = () => {
    setPromptEvaluated(true);
    if (promptIdx === 0) {
      if (tempVal <= 0.3 && topPVal >= 0.8) {
        setPromptPassed(true);
        confetti({ particleCount: 75, spread: 70 });
      } else {
        setPromptPassed(false);
      }
    } else {
      if (tempVal >= 0.7) {
        setPromptPassed(true);
        confetti({ particleCount: 75, spread: 70 });
      } else {
        setPromptPassed(false);
      }
    }
  };

  // Real-time simulated output text preview based on sliders
  const getSimulatedOutput = () => {
    if (promptIdx === 0) {
      if (tempVal <= 0.3) {
        return `# Generated with Temp: ${tempVal}, Top-P: ${topPVal}\ndef parse_transaction(payload: dict) -> dict:\n    """Deterministic, type-safe financial processing."""\n    return {\n        "status": "APPROVED",\n        "amount": round(float(payload.get("amount", 0)), 2)\n    }`;
      } else if (tempVal <= 0.6) {
        return `# Generated with Temp: ${tempVal}, Top-P: ${topPVal}\ndef parse_transaction(payload):\n    # Moderate creativity - might include comments or slight syntax drift\n    return {"status": "ok", "data": payload}`;
      } else {
        return `// Warning: Non-deterministic output detected!\n"The transactions flow like cosmic rivers through computational ether..."\n[ERROR: SyntaxError: Expected valid Python code, received imaginative prose]`;
      }
    } else {
      if (tempVal >= 0.7) {
        return `"Under the dual moons of Kepler-452b, the explorer gazed into the neon ruins of an ancient synthetic mind..."\n[SUCCESS: High variance creative narrative output]`;
      } else {
        return `"The astronaut arrived at the planet. The weather was normal. The mission proceeded."\n[FEEDBACK: Too robotic! Increase temperature for creative storytelling]`;
      }
    }
  };

  // ==========================================
  // --- GAME 5: BUG SMASHER WITH COMBO & SQUASH ---
  // ==========================================
  const [bugs, setBugs] = useState(bugItemsList);
  const [smashedScore, setSmashedScore] = useState(0);
  const [bugsTimeLeft, setBugsTimeLeft] = useState(25);
  const [bugsRunning, setBugsRunning] = useState(false);
  const [bugsGameOver, setBugsGameOver] = useState(false);
  const [combo, setCombo] = useState(1);

  useEffect(() => {
    let t = null;
    if (bugsRunning && bugsTimeLeft > 0) {
      t = setInterval(() => setBugsTimeLeft((time) => time - 1), 1000);
    } else if (bugsTimeLeft === 0 && bugsRunning) {
      setBugsRunning(false);
      setBugsGameOver(true);
      confetti({ particleCount: 70, spread: 70 });
    }
    return () => clearInterval(t);
  }, [bugsRunning, bugsTimeLeft]);

  const smashBug = (id) => {
    if (!bugsRunning) setBugsRunning(true);
    const added = 100 * combo;
    setSmashedScore((s) => s + added);
    setCombo((c) => Math.min(c + 1, 5));
    setBugs((prev) => prev.filter((b) => b.id !== id));

    if (bugs.length <= 2) {
      setTimeout(() => setBugs(bugItemsList.sort(() => Math.random() - 0.5)), 250);
    }
  };

  const resetBugsGame = () => {
    setBugs(bugItemsList);
    setSmashedScore(0);
    setBugsTimeLeft(25);
    setCombo(1);
    setBugsRunning(false);
    setBugsGameOver(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-5 sm:p-7 border border-amber-500/40 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Gamepad2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Dev PlaySpace <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono border border-amber-500/30">60FPS Arcade</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">Interactive games testing speed, logic, debugging &amp; snake skills!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
          {[
            { id: 'snake', label: '🐍 Neon Snake', badge: 'Canvas 60fps' },
            { id: 'typer', label: '⚡ Code Typer', badge: 'Live WPM' },
            { id: 'memory', label: '🧠 Stack Memory', badge: '3D Flip' },
            { id: 'prompt', label: '🤖 LLM Prompt Tuner', badge: 'AI Preview' },
            { id: 'bugs', label: '🐛 Bug Smasher', badge: 'Combo' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-slate-950/80 text-amber-300 border border-amber-500/30 font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* GAME TAB 1: 60FPS CANVAS NEON SNAKE */}
        {/* ============================================================ */}
        {activeTab === 'snake' && (
          <div className="space-y-5">
            {/* Top Score & Speed Dashboard */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
              <div className="flex items-center gap-5">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Current Score</span>
                  <p className="text-2xl font-black text-amber-400 font-mono">{snakeScore}</p>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">High Score</span>
                  <p className="text-2xl font-black text-amber-500 font-mono">{snakeHighScore}</p>
                </div>
              </div>

              {/* Difficulty Speed Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <Gauge className="w-4 h-4 text-amber-400 ml-1.5" />
                {[
                  { id: 'easy', label: 'Easy (1x)' },
                  { id: 'normal', label: 'Normal (2x)' },
                  { id: 'hard', label: 'Hard (3x)' }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      difficulty === d.id
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {!snakeRunning ? (
                <button
                  onClick={startSnakeGame}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{snakeGameOver ? 'Play Again' : 'Start Snake Game'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setSnakeRunning(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}
            </div>

            {/* Canvas Box with Touch Swipe Listener */}
            <div className="relative mx-auto w-full max-w-[384px] aspect-square rounded-2xl border-2 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.25)] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={GRID_SIZE * CELL_PX}
                height={GRID_SIZE * CELL_PX}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-full h-full block cursor-crosshair"
              />

              {/* Floating Score Animation on Canvas */}
              {floatingScore && (
                <div 
                  className="absolute pointer-events-none font-black font-mono text-amber-300 text-sm animate-bounce"
                  style={{ left: `${floatingScore.x}px`, top: `${floatingScore.y}px` }}
                >
                  {floatingScore.text}
                </div>
              )}

              {/* Game Over Banner Overlay */}
              {snakeGameOver && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 z-30 animate-fade-in">
                  <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
                  <h3 className="text-2xl font-black text-white">Game Over!</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Final Score: <strong className="text-amber-400 text-base">{snakeScore}</strong>
                  </p>
                  <button
                    onClick={startSnakeGame}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-transform"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            {/* Mobile / Screen D-Pad Controls */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">
                Tip: Swipe on canvas or use Keyboard Arrows / D-Pad:
              </span>
              <div className="grid grid-cols-3 gap-2 w-48">
                <div />
                <button
                  onClick={() => changeSnakeDirection('UP')}
                  className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <div />
                <button
                  onClick={() => changeSnakeDirection('LEFT')}
                  className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeSnakeDirection('DOWN')}
                  className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeSnakeDirection('RIGHT')}
                  className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 2: CODE SPEED TYPER WITH CHAR HIGHLIGHTING */}
        {/* ============================================================ */}
        {activeTab === 'typer' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Time Left</span>
                  <p className="text-2xl font-black text-amber-400 font-mono">{timeLeft}s</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Snippets Passed</span>
                  <p className="text-2xl font-black text-white font-mono">{completedCount}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Score (WPM)</span>
                  <p className="text-2xl font-black text-amber-500 font-mono">{scoreWpm}</p>
                </div>
              </div>

              <button
                onClick={resetTyperGame}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Target Snippet with Character-by-Character Highlighting */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 text-left space-y-4">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                Type exact code syntax below (watch character match):
              </span>

              {/* Character by character display */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xl sm:text-2xl tracking-wide flex flex-wrap items-center">
                {codeSnippets[snippetIndex].split('').map((char, i) => {
                  let colorClass = 'text-slate-500';
                  let bgClass = '';
                  const isCurrent = i === typedInput.length;

                  if (i < typedInput.length) {
                    if (typedInput[i] === char) {
                      colorClass = 'text-emerald-400 font-bold';
                      bgClass = 'bg-emerald-500/10';
                    } else {
                      colorClass = 'text-rose-400 font-bold underline';
                      bgClass = 'bg-rose-500/20';
                    }
                  }

                  return (
                    <span
                      key={i}
                      className={`relative px-0.5 rounded ${colorClass} ${bgClass} ${
                        isCurrent ? 'border-b-2 border-amber-400 animate-pulse' : ''
                      }`}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </div>

              <input
                type="text"
                value={typedInput}
                onChange={handleTypeChange}
                disabled={typerGameOver}
                placeholder="Type snippet here to start timer..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-amber-500/50 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 3: 3D CARD FLIP STACK MEMORY */}
        {/* ============================================================ */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total Moves</span>
                <p className="text-2xl font-black text-amber-400 font-mono">{memoryMoves}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-300">
                  {matchedIds.length / 2} / {memoryCardsList.length} Pairs Matched
                </span>
                <button
                  onClick={initMemoryGame}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
              </div>
            </div>

            {/* 3D Flip Card Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5">
              {cards.map((card, idx) => {
                const isFlipped = flippedCards.includes(idx) || matchedIds.includes(card.uniqueId);

                return (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(idx)}
                    style={{ perspective: 1000 }}
                    className="h-28 rounded-2xl cursor-pointer group"
                  >
                    <div
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                      }}
                      className="relative w-full h-full rounded-2xl shadow-lg"
                    >
                      {/* Back of Card (unflipped) */}
                      <div 
                        style={{ backfaceVisibility: 'hidden' }}
                        className="absolute inset-0 w-full h-full rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 flex flex-col items-center justify-center shadow-md transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center">
                          <span className="text-amber-400 font-black font-mono text-xs">JD</span>
                        </div>
                      </div>

                      {/* Front of Card (flipped) */}
                      <div 
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                        className={`absolute inset-0 w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center p-2 shadow-xl ${
                          matchedIds.includes(card.uniqueId)
                            ? 'bg-emerald-950/40 border-emerald-500 text-white'
                            : 'bg-amber-950/40 border-amber-500 text-white'
                        }`}
                      >
                        <span className="text-3xl filter drop-shadow">{card.icon}</span>
                        <span className="text-xs font-bold font-mono mt-1 text-amber-300">{card.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 4: LLM PROMPT TUNER WITH LIVE STREAMING */}
        {/* ============================================================ */}
        {activeTab === 'prompt' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-400" />
                  <span>{promptChallenges[promptIdx].title}</span>
                </h3>
                <div className="flex gap-1.5">
                  {promptChallenges.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setPromptIdx(i); setPromptEvaluated(false); }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        promptIdx === i ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Challenge #{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300">{promptChallenges[promptIdx].description}</p>
              
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                Goal: {promptChallenges[promptIdx].task}
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Temperature (Creativity):</span>
                    <span className="text-amber-400 font-bold">{tempVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={tempVal}
                    onChange={(e) => {
                      setTempVal(parseFloat(e.target.value));
                      setPromptEvaluated(false);
                    }}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Deterministic (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Top-P (Nucleus Sampling):</span>
                    <span className="text-amber-400 font-bold">{topPVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={topPVal}
                    onChange={(e) => {
                      setTopPVal(parseFloat(e.target.value));
                      setPromptEvaluated(false);
                    }}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Focused (0.1)</span>
                    <span>Broad (1.0)</span>
                  </div>
                </div>
              </div>

              {/* Real-time LLM Output Simulation Preview */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Live AI Token Stream Preview:
                </span>
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                  {getSimulatedOutput()}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={evaluatePromptSettings}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-transform"
                >
                  Verify Model Configuration
                </button>

                {promptEvaluated && (
                  <div className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold ${
                    promptPassed 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                      : 'bg-rose-500/20 border-rose-500 text-rose-300'
                  }`}>
                    {promptPassed 
                      ? "✅ Verified! Optimal parameters for this AI workload." 
                      : "⚠️ Adjust parameters to match challenge objective."}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 5: BUG SMASHER WITH COMBO & SQUASH */}
        {/* ============================================================ */}
        {activeTab === 'bugs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Time Left</span>
                  <p className="text-2xl font-black text-amber-400 font-mono">{bugsTimeLeft}s</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Score</span>
                  <p className="text-2xl font-black text-amber-500 font-mono">{smashedScore}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Combo Streak</span>
                  <p className="text-2xl font-black text-emerald-400 font-mono flex items-center gap-1">
                    <span>{combo}x</span>
                    <Flame className="w-4 h-4 text-orange-400" />
                  </p>
                </div>
              </div>

              <button
                onClick={resetBugsGame}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {bugs.map((bug) => (
                <div
                  key={bug.id}
                  onClick={() => smashBug(bug.id)}
                  className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 hover:bg-rose-500/20 cursor-pointer flex items-center justify-between transition-all transform hover:scale-102 active:scale-95 group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Bug className="w-5 h-5 text-rose-400 group-hover:animate-bounce" />
                    <span className="text-xs font-mono font-bold text-slate-200">{bug.label}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold uppercase shadow-sm">
                    Smash!
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
