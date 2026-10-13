import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Play, Pause, Gauge, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const GRID_SIZE = 16;
const CELL_PX = 24; // 16 * 24 = 384px canvas
const speedMap = { easy: 190, normal: 130, hard: 75 };

export default function NeonSnake() {
  const canvasRef = useRef(null);

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
  const [snakeHighScore, setSnakeHighScore] = useState(() =>
    parseInt(localStorage.getItem('snake_highscore') || '0', 10)
  );
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

  const changeSnakeDirection = useCallback((newDir) => {
    const opposites = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    if (opposites[newDir] !== directionRef.current) {
      directionRef.current = newDir;
      setDirection(newDir);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
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
  }, [changeSnakeDirection]);

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
          eye2 = { x: sx + CELL_PX - 8, y: sy + 6 };
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
      for (const seg of prevSnake) {
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

  return (
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
          aria-label="Neon Snake game canvas"
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
            aria-label="Move up"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div />
          <button
            onClick={() => changeSnakeDirection('LEFT')}
            className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
            aria-label="Move left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => changeSnakeDirection('DOWN')}
            className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
            aria-label="Move down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => changeSnakeDirection('RIGHT')}
            className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all"
            aria-label="Move right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
