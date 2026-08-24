import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Eye, MessageSquare, Volume2 } from 'lucide-react';

export default function Avatar3D() {
  const [shape, setShape] = useState('circle'); // circle, squircle, capsule, blob, hexagon
  const [expression, setExpression] = useState('attentive'); // neutral, attentive, surprised, excited, happy, curious
  const [colorTheme, setColorTheme] = useState('black'); // black, gold, cyan, purple
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [speech, setSpeech] = useState("Hi! I'm Janardhan's 3D AI Assistant 👋 Move your mouse to look around!");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const containerRef = useRef(null);

  const speeches = [
    "Hi! I'm Janardhan's 3D AI Assistant 👋 Move your mouse to look around!",
    "Janardhan completed a Python Internship at InnoByte Services building the Finance Manager GUI!",
    "Check out the Dev PlaySpace mini-games, including the new 🐍 Snake Game!",
    "Hover over the Certificate section to preview Janardhan's official credentials live!",
    "Ask the AI Portfolio Assistant in the bottom right corner for fast answers!"
  ];

  // Mouse tracking for 3D tilt & eye pupils
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Eye offset clamp
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 18;
      const angle = Math.atan2(dy, dx);

      const offsetDist = Math.min(dist * 0.08, maxOffset);
      const eyeX = Math.cos(angle) * offsetDist;
      const eyeY = Math.sin(angle) * offsetDist;

      setEyePos({ x: eyeX, y: eyeY });

      // 3D tilt angle
      const tiltX = Math.max(Math.min(-dy * 0.04, 15), -15);
      const tiltY = Math.max(Math.min(dx * 0.04, 15), -15);
      setTilt({ rx: tiltX, ry: tiltY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAvatarClick = () => {
    // Random speech & expression trigger
    const nextIndex = (speeches.indexOf(speech) + 1) % speeches.length;
    setSpeech(speeches[nextIndex]);
    
    const exprList = ['surprised', 'excited', 'happy', 'curious', 'attentive'];
    const nextExpr = exprList[Math.floor(Math.random() * exprList.length)];
    setExpression(nextExpr);

    // Voice synth
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speeches[nextIndex]);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Color theme mapper
  const colorMap = {
    black: { bg: 'from-slate-900 via-black to-slate-950', stroke: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.4)', fill: '#0a0d14' },
    gold: { bg: 'from-amber-600 via-yellow-500 to-amber-700', stroke: '#ffffff', shadow: 'rgba(251, 191, 36, 0.6)', fill: '#d97706' },
    cyan: { bg: 'from-cyan-600 via-teal-500 to-cyan-800', stroke: '#38bdf8', shadow: 'rgba(56, 189, 248, 0.5)', fill: '#0e7490' },
    purple: { bg: 'from-purple-700 via-indigo-600 to-slate-950', stroke: '#c084fc', shadow: 'rgba(192, 132, 252, 0.5)', fill: '#581c87' }
  };

  const activeColor = colorMap[colorTheme];

  // Render 3D eye pupils
  const renderEyes = () => {
    if (expression === 'excited') {
      return (
        <g className="transition-all duration-300">
          <path d="M-30,-5 Q-20,-25 -10,-5" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
          <path d="M10,-5 Q20,-25 30,-5" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
        </g>
      );
    }
    if (expression === 'happy') {
      return (
        <g className="transition-all duration-300">
          <path d="M-32,5 Q-20,-15 -8,5" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
          <path d="M8,5 Q20,-15 32,5" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
          {/* Blushing cheeks */}
          <circle cx="-38" cy="18" r="8" fill="#f43f5e" opacity="0.6"/>
          <circle cx="38" cy="18" r="8" fill="#f43f5e" opacity="0.6"/>
        </g>
      );
    }
    if (expression === 'surprised') {
      return (
        <g className="transition-all duration-300" transform={`translate(${eyePos.x}, ${eyePos.y})`}>
          <circle cx="-22" cy="-5" r="14" fill="#ffffff"/>
          <circle cx="-22" cy="-5" r="6" fill="#0f172a"/>
          <circle cx="22" cy="-5" r="14" fill="#ffffff"/>
          <circle cx="22" cy="-5" r="6" fill="#0f172a"/>
        </g>
      );
    }
    if (expression === 'curious') {
      return (
        <g className="transition-all duration-300" transform={`translate(${eyePos.x}, ${eyePos.y})`}>
          {/* Left open eye */}
          <rect x="-30" y="-18" width="16" height="24" rx="8" fill="#ffffff"/>
          <circle cx="-22" cy="-6" r="4" fill="#0f172a"/>
          {/* Right winking arc */}
          <path d="M14,0 Q24,-14 34,0" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round"/>
        </g>
      );
    }

    // Default attentive / neutral
    return (
      <g className="transition-transform duration-100 ease-out" transform={`translate(${eyePos.x}, ${eyePos.y})`}>
        {/* Left eye pill */}
        <rect x="-30" y="-18" width="16" height="26" rx="8" fill="#ffffff" />
        <circle cx="-22" cy="-5" r="4" fill="#090d16"/>
        <circle cx="-24" cy="-10" r="2" fill="#ffffff"/>

        {/* Right eye pill */}
        <rect x="14" y="-18" width="16" height="26" rx="8" fill="#ffffff"/>
        <circle cx="22" cy="-5" r="4" fill="#090d16"/>
        <circle cx="20" cy="-10" r="2" fill="#ffffff"/>
      </g>
    );
  };

  // Shape clipping/rendering
  const getShapePath = () => {
    if (shape === 'squircle') return "M-70,-60 Q0,-80 70,-60 Q85,0 70,60 Q0,80 -70,60 Q-85,0 -70,-60 Z";
    if (shape === 'capsule') return "M-50,-75 Q0,-80 50,-75 Q75,-40 75,40 Q50,80 0,80 Q-50,80 -75,40 Q-75,-40 -50,-75 Z";
    if (shape === 'blob') return "M-65,-60 Q0,-85 65,-60 Q85,10 55,65 Q-10,85 -65,55 Q-85,-10 -65,-60 Z";
    if (shape === 'hexagon') return "M-60,-40 L0,-75 L60,-40 L60,40 L0,75 L-60,40 Z";
    // Circle default
    return "M0,0";
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none group">
      
      {/* Speech Bubble */}
      <div 
        onClick={handleAvatarClick}
        className="cursor-pointer mb-4 max-w-xs px-4 py-2.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-amber-500/40 text-slate-100 text-xs font-semibold shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md transition-all transform hover:scale-105 flex items-center gap-2.5 animate-bounce-slow"
      >
        <MessageSquare className={`w-4 h-4 shrink-0 ${isSpeaking ? 'text-amber-400 animate-pulse' : 'text-amber-500'}`} />
        <span>{speech}</span>
      </div>

      {/* 3D Interactive Canvas Avatar */}
      <div 
        onClick={handleAvatarClick}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out'
        }}
        className="relative cursor-pointer w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
      >
        {/* Glow backdrop */}
        <div 
          className="absolute inset-2 rounded-full filter blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
          style={{ background: activeColor.shadow }}
        />

        <svg viewBox="-100 -100 200 200" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]">
          <defs>
            <radialGradient id="avatar3dGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2a3447"/>
              <stop offset="50%" stopColor="#0c101d"/>
              <stop offset="100%" stopColor="#05070c"/>
            </radialGradient>
            <linearGradient id="goldGleam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
          </defs>

          {/* Main Body Shape */}
          {shape === 'circle' ? (
            <circle cx="0" cy="0" r="75" fill="url(#avatar3dGrad)" stroke={activeColor.stroke} strokeWidth="3.5" />
          ) : (
            <path d={getShapePath()} fill="url(#avatar3dGrad)" stroke={activeColor.stroke} strokeWidth="3.5" />
          )}

          {/* 3D Highlight Sheen */}
          <ellipse cx="-25" cy="-35" rx="35" ry="18" fill="#ffffff" opacity="0.12" transform="rotate(-25 -25 -35)" />

          {/* Render Eyes */}
          {renderEyes()}

          {/* Audio Speaking Waves */}
          {isSpeaking && (
            <g transform="translate(0, 45)">
              <circle cx="-15" cy="0" r="3" fill="#fbbf24" className="animate-ping"/>
              <circle cx="0" cy="0" r="3" fill="#fbbf24" className="animate-ping delay-100"/>
              <circle cx="15" cy="0" r="3" fill="#fbbf24" className="animate-ping delay-200"/>
            </g>
          )}
        </svg>

        {/* 3D Ground Shadow */}
        <div 
          className="absolute -bottom-4 w-3/4 h-5 rounded-full bg-black/60 blur-md transform scale-x-90 transition-all group-hover:scale-x-110"
        />
      </div>

      {/* Avatar Customization Toolbar */}
      <div className="mt-4 flex items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg text-[11px] font-semibold text-slate-300">
        
        {/* Shape Picker */}
        <div className="flex items-center gap-1 border-r border-slate-800 pr-2">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          {['circle', 'squircle', 'capsule', 'blob'].map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-2 py-1 rounded-lg capitalize transition-colors ${
                shape === s ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Expression Switcher */}
        <button
          onClick={() => {
            const exprs = ['attentive', 'excited', 'happy', 'surprised', 'curious'];
            setExpression(exprs[(exprs.indexOf(expression) + 1) % exprs.length]);
          }}
          className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 font-bold capitalize flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3 animate-spin-slow" />
          <span>{expression}</span>
        </button>

      </div>

    </div>
  );
}
