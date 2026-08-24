import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, Eye, RefreshCw, Smile, Brain, Moon, Zap, AlertCircle } from 'lucide-react';

export default function Avatar3D({ 
  isSpeaking = false, 
  onAvatarClick, 
  currentSpeech = '', 
  compact = false 
}) {
  const [shape, setShape] = useState('circle'); // circle, squircle, capsule, blob
  const [expression, setExpression] = useState('attentive'); // attentive, happy, excited, surprised, thinking, wink, sleepy
  const [colorTheme, setColorTheme] = useState('black'); // black, gold, cyan, purple
  
  // Real-time smooth eye lerp state
  const targetEye = useRef({ x: 0, y: 0 });
  const currentEye = useRef({ x: 0, y: 0 });
  const [renderEyePos, setRenderEyePos] = useState({ x: 0, y: 0 });

  // 3D Tilt Lerp
  const targetTilt = useRef({ rx: 0, ry: 0 });
  const currentTilt = useRef({ rx: 0, ry: 0 });
  const [renderTilt, setRenderTilt] = useState({ rx: 0, ry: 0 });

  // Eyelid Blinking
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef(null);

  // Smooth lerp 60fps animation loop
  useEffect(() => {
    let animId;
    const updateLerp = () => {
      // Thinking mode eye drift
      if (expression === 'thinking') {
        targetEye.current = { x: -8, y: -10 };
      }

      // Lerp Eye Position
      currentEye.current.x += (targetEye.current.x - currentEye.current.x) * 0.08;
      currentEye.current.y += (targetEye.current.y - currentEye.current.y) * 0.08;

      // Lerp Tilt Position
      currentTilt.current.rx += (targetTilt.current.rx - currentTilt.current.rx) * 0.06;
      currentTilt.current.ry += (targetTilt.current.ry - currentTilt.current.ry) * 0.06;

      setRenderEyePos({ x: currentEye.current.x, y: currentEye.current.y });
      setRenderTilt({ rx: currentTilt.current.rx, ry: currentTilt.current.ry });

      animId = requestAnimationFrame(updateLerp);
    };

    animId = requestAnimationFrame(updateLerp);
    return () => cancelAnimationFrame(animId);
  }, [expression]);

  // Mouse movement listener for smooth target position calculation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || expression === 'thinking' || expression === 'sleepy') return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxEyeOffset = 18;
      const angle = Math.atan2(dy, dx);
      const offsetDist = Math.min(dist * 0.06, maxEyeOffset);

      targetEye.current = {
        x: Math.cos(angle) * offsetDist,
        y: Math.sin(angle) * offsetDist
      };

      targetTilt.current = {
        rx: Math.max(Math.min(-dy * 0.03, 14), -14),
        ry: Math.max(Math.min(dx * 0.03, 14), -14)
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [expression]);

  // Natural periodic blinking loop (every 3.5 - 5 seconds)
  useEffect(() => {
    const triggerBlink = () => {
      if (expression === 'sleepy') return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerBlink();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [expression]);

  // Color theme map
  const colorMap = {
    black: { stroke: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.4)', fill: '#0a0d14' },
    gold: { stroke: '#ffffff', shadow: 'rgba(251, 191, 36, 0.6)', fill: '#d97706' },
    cyan: { stroke: '#38bdf8', shadow: 'rgba(56, 189, 248, 0.5)', fill: '#0e7490' },
    purple: { stroke: '#c084fc', shadow: 'rgba(192, 132, 252, 0.5)', fill: '#581c87' }
  };

  const activeColor = colorMap[colorTheme];

  // Render Realistic 3D Eyes based on Expressions & Moods
  const renderRealistic3DEyes = () => {
    if (isBlinking || expression === 'sleepy') {
      return (
        <g>
          {/* Eyelid Blink Arcs */}
          <path d="M-36,-3 Q-22,12 -8,-3" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M8,-3 Q22,12 36,-3" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          {expression === 'sleepy' && (
            <text x="45" y="-20" fill="#fbbf24" fontStyle="italic" fontSize="16" fontWeight="bold" className="animate-pulse">zZz...</text>
          )}
        </g>
      );
    }

    if (expression === 'happy') {
      return (
        <g transform={`translate(${renderEyePos.x * 0.5}, ${renderEyePos.y * 0.5})`}>
          {/* Smiling Arcs */}
          <path d="M-36,5 Q-22,-15 -8,5" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <path d="M8,5 Q22,-15 36,5" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          {/* Blushing Cheeks */}
          <circle cx="-38" cy="18" r="8" fill="#f43f5e" opacity="0.6" />
          <circle cx="38" cy="18" r="8" fill="#f43f5e" opacity="0.6" />
        </g>
      );
    }

    if (expression === 'surprised') {
      return (
        <g transform={`translate(${renderEyePos.x}, ${renderEyePos.y})`}>
          {/* Eyebrows Raised */}
          <path d="M-35,-26 Q-22,-34 -10,-26" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <path d="M10,-26 Q22,-34 35,-26" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          {/* Wide Eyeballs */}
          <ellipse cx="-24" cy="-5" rx="17" ry="22" fill="url(#eyeballGrad)" stroke="#fbbf24" strokeWidth="1.5" />
          <ellipse cx="-24" cy="-5" rx="10" ry="13" fill="url(#irisGoldGrad)" />
          <circle cx="-24" cy="-5" r="5" fill="#04060a" />
          <circle cx="-27.5" cy="-9" r="3" fill="#ffffff" opacity="0.95" />

          <ellipse cx="24" cy="-5" rx="17" ry="22" fill="url(#eyeballGrad)" stroke="#fbbf24" strokeWidth="1.5" />
          <ellipse cx="24" cy="-5" rx="10" ry="13" fill="url(#irisGoldGrad)" />
          <circle cx="24" cy="-5" r="5" fill="#04060a" />
          <circle cx="20.5" cy="-9" r="3" fill="#ffffff" opacity="0.95" />
        </g>
      );
    }

    if (expression === 'excited') {
      return (
        <g transform={`translate(${renderEyePos.x}, ${renderEyePos.y})`}>
          {/* Starry Eyeballs */}
          <g transform="translate(-24, -5)">
            <ellipse cx="0" cy="0" rx="16" ry="20" fill="url(#eyeballGrad)" />
            <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" fill="#fbbf24" />
          </g>
          <g transform="translate(24, -5)">
            <ellipse cx="0" cy="0" rx="16" ry="20" fill="url(#eyeballGrad)" />
            <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" fill="#fbbf24" />
          </g>
        </g>
      );
    }

    if (expression === 'wink') {
      return (
        <g transform={`translate(${renderEyePos.x}, ${renderEyePos.y})`}>
          {/* Left Realistic 3D Eye */}
          <g transform="translate(-24, -5)">
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="url(#eyeballGrad)" stroke="#1e293b" strokeWidth="1" />
            <ellipse cx="0" cy="0" rx="9" ry="11" fill="url(#irisGoldGrad)" />
            <circle cx="0" cy="0" r="4.5" fill="#05070a" />
            <circle cx="-3" cy="-4" r="2.5" fill="#ffffff" opacity="0.9" />
          </g>
          {/* Right Winking Arc */}
          <path d="M12,-2 Q24,-14 36,-2" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );
    }

    // Default Realistic 3D Eyeballs (Attentive / Thinking)
    return (
      <g transform={`translate(${renderEyePos.x}, ${renderEyePos.y})`}>
        {/* Eyebrows */}
        {expression === 'thinking' && (
          <path d="M-34,-24 L-12,-20 M12,-20 L34,-24" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Left Eyeball */}
        <g transform="translate(-24, -5)">
          <ellipse cx="0" cy="0" rx="15" ry="20" fill="url(#eyeballGrad)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" />
          <ellipse cx="0" cy="0" rx="9.5" ry="12.5" fill="url(#irisGoldGrad)" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#04060a" />
          <circle cx="-3.5" cy="-5" r="2.8" fill="#ffffff" opacity="0.95" />
          <circle cx="3" cy="4" r="1.4" fill="#ffffff" opacity="0.75" />
        </g>

        {/* Right Eyeball */}
        <g transform="translate(24, -5)">
          <ellipse cx="0" cy="0" rx="15" ry="20" fill="url(#eyeballGrad)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" />
          <ellipse cx="0" cy="0" rx="9.5" ry="12.5" fill="url(#irisGoldGrad)" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#04060a" />
          <circle cx="-3.5" cy="-5" r="2.8" fill="#ffffff" opacity="0.95" />
          <circle cx="3" cy="4" r="1.4" fill="#ffffff" opacity="0.75" />
        </g>
      </g>
    );
  };

  // Shape Path Generator
  const getShapePath = () => {
    if (shape === 'squircle') return "M-70,-60 Q0,-80 70,-60 Q85,0 70,60 Q0,80 -70,60 Q-85,0 -70,-60 Z";
    if (shape === 'capsule') return "M-50,-75 Q0,-80 50,-75 Q75,-40 75,40 Q50,80 0,80 Q-50,80 -75,40 Q-75,-40 -50,-75 Z";
    if (shape === 'blob') return "M-65,-60 Q0,-85 65,-60 Q85,10 55,65 Q-10,85 -65,55 Q-85,-10 -65,-60 Z";
    return "M0,0";
  };

  if (compact) {
    return (
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg viewBox="-50 -50 100 100" className="w-full h-full">
          <circle cx="0" cy="0" r="40" fill="#0c101d" stroke="#f59e0b" strokeWidth="3" />
          <g transform={`translate(${renderEyePos.x * 0.3}, ${renderEyePos.y * 0.3})`}>
            <circle cx="-12" cy="-3" r="6" fill="#ffffff" />
            <circle cx="-12" cy="-3" r="3" fill="#04060a" />
            <circle cx="12" cy="-3" r="6" fill="#ffffff" />
            <circle cx="12" cy="-3" r="3" fill="#04060a" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none group">
      
      {/* Speech Bubble */}
      {currentSpeech && (
        <div 
          onClick={onAvatarClick}
          className="cursor-pointer mb-3 max-w-xs px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-amber-500/40 text-slate-100 text-xs font-semibold shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md transition-all transform hover:scale-105 flex items-center gap-2.5 animate-bounce-slow"
        >
          <MessageSquare className={`w-4 h-4 shrink-0 ${isSpeaking ? 'text-amber-400 animate-pulse' : 'text-amber-500'}`} />
          <span>{currentSpeech}</span>
        </div>
      )}

      {/* 3D Realistic Interactive Avatar Body */}
      <div 
        onClick={onAvatarClick}
        style={{
          transform: `perspective(1000px) rotateX(${renderTilt.rx}deg) rotateY(${renderTilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.05s linear'
        }}
        className="relative cursor-pointer w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center"
      >
        {/* Glow Aura */}
        <div 
          className="absolute inset-2 rounded-full filter blur-2xl opacity-65 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: activeColor.shadow }}
        />

        <svg viewBox="-100 -100 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]">
          <defs>
            {/* Body Gradient */}
            <radialGradient id="avatar3dGrad" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#1e293b"/>
              <stop offset="45%" stopColor="#0c101d"/>
              <stop offset="100%" stopColor="#04060a"/>
            </radialGradient>

            {/* Realistic Eyeball Sclera Gradient */}
            <radialGradient id="eyeballGrad" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>

            {/* Realistic Golden Iris Gradient */}
            <radialGradient id="irisGoldGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="85%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>

          {/* Main Body */}
          {shape === 'circle' ? (
            <circle cx="0" cy="0" r="74" fill="url(#avatar3dGrad)" stroke={activeColor.stroke} strokeWidth="3.5" />
          ) : (
            <path d={getShapePath()} fill="url(#avatar3dGrad)" stroke={activeColor.stroke} strokeWidth="3.5" />
          )}

          {/* Glossy 3D Highlight Sheen */}
          <ellipse cx="-25" cy="-35" rx="35" ry="18" fill="#ffffff" opacity="0.13" transform="rotate(-25 -25 -35)" />

          {/* Render Realistic 3D Eyes & Expressions */}
          {renderRealistic3DEyes()}

          {/* Audio Speaking Soundwaves */}
          {isSpeaking && (
            <g transform="translate(0, 48)">
              <circle cx="-14" cy="0" r="3" fill="#fbbf24" className="animate-ping"/>
              <circle cx="0" cy="0" r="3" fill="#fbbf24" className="animate-ping delay-100"/>
              <circle cx="14" cy="0" r="3" fill="#fbbf24" className="animate-ping delay-200"/>
            </g>
          )}
        </svg>

        {/* 3D Ground Shadow */}
        <div 
          className="absolute -bottom-4 w-3/4 h-5 rounded-full bg-black/70 blur-md transform scale-x-90 transition-all group-hover:scale-x-110"
        />
      </div>

      {/* Avatar Toolbar Controls with Expressions & Mood Selector */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg text-[11px] font-semibold text-slate-300">
        
        {/* Shape Picker */}
        <div className="flex items-center gap-1 border-r border-slate-800 pr-2">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          {['circle', 'squircle', 'capsule', 'blob'].map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-2 py-0.5 rounded-lg capitalize transition-colors ${
                shape === s ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Mood Expressions Trigger */}
        <div className="flex items-center gap-1">
          {[
            { id: 'attentive', label: 'Attentive', icon: Eye },
            { id: 'happy', label: 'Happy', icon: Smile },
            { id: 'thinking', label: 'Thinking', icon: Brain },
            { id: 'sleepy', label: 'Sleepy', icon: Moon }
          ].map((m) => {
            const IconComp = m.icon;
            const isActive = expression === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setExpression(m.id)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-3 h-3" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
