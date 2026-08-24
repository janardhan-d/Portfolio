import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  X, 
  Sparkles, 
  Trophy, 
  Timer, 
  Zap, 
  RefreshCw, 
  Brain,
  Cpu,
  Bug,
  Flame,
  CheckCircle2,
  Sliders,
  Terminal,
  Play,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause
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
    task: "Set Temperature <= 0.3 and Top-P >= 0.8 to generate production-ready Python."
  },
  {
    id: 2,
    title: "Creative Storytelling AI",
    description: "Adjust settings to generate imaginative AI response for interactive gaming.",
    optimalTemp: 0.8,
    optimalTopP: 0.95,
    task: "Set Temperature >= 0.7 for max creativity."
  }
];

// Game 4 Bugs List
const bugItemsList = [
  { id: 1, label: "SyntaxError: missing ':'", type: "syntax" },
  { id: 2, label: "Uncaught ReferenceError: x is not defined", type: "reference" },
  { id: 3, label: "TypeError: Cannot read property 'map' of undefined", type: "type" },
  { id: 4, label: "IndentationError: unexpected indent", type: "indent" },
  { id: 5, label: "UnhandledPromiseRejectionWarning: Missing await", type: "async" },
  { id: 6, label: "RecursionError: maximum depth exceeded", type: "recursion" },
];

export default function RecruiterArcade({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('snake');

  // ==========================================
  // --- GAME 1: Snake Game State & Logic ---
  // ==========================================
  const GRID_SIZE = 16;
  const [snake, setSnake] = useState([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 }
  ]);
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [isGoldFood, setIsGoldFood] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake_highscore') || '0', 10);
  });
  const [snakeRunning, setSnakeRunning] = useState(false);
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const directionRef = useRef('RIGHT');

  // Change Direction helper
  const changeSnakeDirection = (newDir) => {
    const opposites = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    if (opposites[newDir] !== directionRef.current) {
      directionRef.current = newDir;
      setDirection(newDir);
    }
  };

  // Keyboard controls for Snake
  useEffect(() => {
    if (!isOpen || activeTab !== 'snake') return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('UP');
      }
      if (['ArrowDown', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('DOWN');
      }
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('LEFT');
      }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab]);

  // Snake Tick Interval
  useEffect(() => {
    if (!snakeRunning || snakeGameOver) return;

    const tick = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = directionRef.current;

        if (currentDir === 'UP') head.y -= 1;
        if (currentDir === 'DOWN') head.y += 1;
        if (currentDir === 'LEFT') head.x -= 1;
        if (currentDir === 'RIGHT') head.x += 1;

        // Check Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          handleSnakeGameOver();
          return prevSnake;
        }

        // Check Self Collision
        for (let segment of prevSnake) {
          if (segment.x === head.x && segment.y === head.y) {
            handleSnakeGameOver();
            return prevSnake;
          }
        }

        // Check Food Collision
        const newSnake = [head, ...prevSnake];
        if (head.x === food.x && head.y === food.y) {
          const addedScore = isGoldFood ? 30 : 10;
          setSnakeScore((s) => {
            const nextS = s + addedScore;
            if (nextS > snakeHighScore) {
              setSnakeHighScore(nextS);
              localStorage.setItem('snake_highscore', nextS.toString());
            }
            return nextS;
          });

          // Generate new food
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => clearInterval(tick);
  }, [snakeRunning, snakeGameOver, food, isGoldFood, snakeHighScore]);

  const generateFood = (currentSnake) => {
    let newX, newY;
    while (true) {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
      const isOccupied = currentSnake.some((seg) => seg.x === newX && seg.y === newY);
      if (!isOccupied) break;
    }
    setFood({ x: newX, y: newY });
    setIsGoldFood(Math.random() > 0.7);
  };

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
    generateFood(initialSnake);
  };

  const handleSnakeGameOver = () => {
    setSnakeRunning(false);
    setSnakeGameOver(true);
    confetti({ particleCount: 50, spread: 60 });
  };

  // ==========================================
  // --- GAME 2: Speed Typer Logic ---
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
  // --- GAME 3: Memory Matcher Logic ---
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
        setTimeout(() => setFlippedCards([]), 900);
      }
    }
  };

  // ==========================================
  // --- GAME 4: Bug Smasher Logic ---
  // ==========================================
  const [bugs, setBugs] = useState(bugItemsList);
  const [smashedScore, setSmashedScore] = useState(0);
  const [bugsTimeLeft, setBugsTimeLeft] = useState(25);
  const [bugsRunning, setBugsRunning] = useState(false);
  const [bugsGameOver, setBugsGameOver] = useState(false);

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
    setSmashedScore((s) => s + 100);
    setBugs((prev) => prev.filter((b) => b.id !== id));

    if (bugs.length <= 1) {
      setTimeout(() => setBugs(bugItemsList.sort(() => Math.random() - 0.5)), 300);
    }
  };

  const resetBugsGame = () => {
    setBugs(bugItemsList);
    setSmashedScore(0);
    setBugsTimeLeft(25);
    setBugsRunning(false);
    setBugsGameOver(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Dev PlaySpace <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono border border-amber-500/30">5 Mini-Games</span>
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
            { id: 'snake', label: '🐍 Neon Snake', badge: 'Popular' },
            { id: 'typer', label: '⚡ Code Typer' },
            { id: 'memory', label: '🧠 Stack Memory' },
            { id: 'prompt', label: '🤖 LLM Prompt Tuner' },
            { id: 'bugs', label: '🐛 Bug Smasher' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-amber-950 text-amber-300 border border-amber-500/40">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* GAME TAB 1: NEON SNAKE GAME */}
        {/* ============================================================ */}
        {activeTab === 'snake' && (
          <div className="space-y-6">
            {/* Top Score Dashboard */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
              <div className="flex items-center gap-6">
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

            {/* Snake 16x16 Grid Box with Explicit Inline CSS Grid */}
            <div 
              className="relative mx-auto w-full max-w-md aspect-square bg-slate-950 rounded-2xl border-2 border-amber-500/50 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] p-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(16, minmax(0, 1fr))',
                gap: '2px'
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);

                const isHead = snake[0].x === x && snake[0].y === y;
                const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
                const isFoodItem = food.x === x && food.y === y;

                return (
                  <div
                    key={i}
                    className={`w-full h-full rounded-xs transition-all duration-75 ${
                      isHead
                        ? 'bg-amber-400 shadow-[0_0_12px_#f59e0b] scale-105 z-10 font-bold flex items-center justify-center'
                        : isBody
                        ? 'bg-amber-500/80 border border-amber-400/40 rounded-xs'
                        : isFoodItem
                        ? isGoldFood
                          ? 'bg-yellow-300 animate-ping shadow-[0_0_15px_#fde047] rounded-full'
                          : 'bg-rose-500 animate-pulse shadow-[0_0_12px_#f43f5e] rounded-full'
                        : 'bg-slate-900/50 border border-slate-900/30'
                    }`}
                  >
                    {isHead && (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                    )}
                  </div>
                );
              })}

              {/* Game Over Banner Overlay */}
              {snakeGameOver && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 z-30">
                  <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
                  <h3 className="text-2xl font-black text-white">Game Over!</h3>
                  <p className="text-xs text-slate-300 font-mono">Final Score: <strong className="text-amber-400">{snakeScore}</strong></p>
                  <button
                    onClick={startSnakeGame}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            {/* Mobile / On-Screen Touch D-Pad Controls */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">Use Keyboard Arrows / WASD or D-Pad below:</span>
              <div className="grid grid-cols-3 gap-2 w-48">
                <div />
                <button
                  onClick={() => changeSnakeDirection('UP')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <div />
                <button
                  onClick={() => changeSnakeDirection('LEFT')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeSnakeDirection('DOWN')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeSnakeDirection('RIGHT')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 2: CODE SPEED TYPER */}
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
              </div>

              <button
                onClick={resetTyperGame}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Snippet Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 text-center space-y-4">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold">Type exact code syntax below:</span>
              <p className="text-2xl font-mono font-bold text-white tracking-wide bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {codeSnippets[snippetIndex]}
              </p>

              <input
                type="text"
                value={typedInput}
                onChange={handleTypeChange}
                disabled={typerGameOver}
                placeholder="Start typing snippet here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/50 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 3: STACK MEMORY MATCHER */}
        {/* ============================================================ */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total Moves</span>
                <p className="text-2xl font-black text-amber-400 font-mono">{memoryMoves}</p>
              </div>

              <button
                onClick={initMemoryGame}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Shuffle &amp; Restart</span>
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {cards.map((card, idx) => {
                const isFlipped = flippedCards.includes(idx) || matchedIds.includes(card.uniqueId);

                return (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(idx)}
                    className={`h-24 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform ${
                      isFlipped
                        ? 'bg-amber-500/20 border-amber-500 text-white scale-100'
                        : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-amber-500/50 hover:scale-105'
                    }`}
                  >
                    {isFlipped ? (
                      <>
                        <span className="text-3xl">{card.icon}</span>
                        <span className="text-xs font-bold font-mono mt-1 text-amber-300">{card.name}</span>
                      </>
                    ) : (
                      <Brain className="w-6 h-6 opacity-40" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 4: LLM PROMPT TUNER */}
        {/* ============================================================ */}
        {activeTab === 'prompt' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>{promptChallenges[promptIdx].title}</span>
              </h3>
              <p className="text-xs text-slate-300">{promptChallenges[promptIdx].description}</p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                Goal: {promptChallenges[promptIdx].task}
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Temperature (Creativity):</span>
                    <span className="text-amber-400 font-bold">{tempVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={tempVal}
                    onChange={(e) => setTempVal(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Top-P (Nucleus Sampling):</span>
                    <span className="text-amber-400 font-bold">{topPVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={topPVal}
                    onChange={(e) => setTopPVal(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME TAB 5: BUG SMASHER */}
        {/* ============================================================ */}
        {activeTab === 'bugs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Score</span>
                <p className="text-2xl font-black text-amber-400 font-mono">{smashedScore}</p>
              </div>

              <button
                onClick={resetBugsGame}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Smasher</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bugs.map((bug) => (
                <div
                  key={bug.id}
                  onClick={() => smashBug(bug.id)}
                  className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 hover:bg-rose-500/20 cursor-pointer flex items-center justify-between transition-all transform hover:scale-105 group"
                >
                  <div className="flex items-center gap-3">
                    <Bug className="w-5 h-5 text-rose-400 group-hover:animate-bounce" />
                    <span className="text-xs font-mono font-bold text-slate-200">{bug.label}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold uppercase">
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
