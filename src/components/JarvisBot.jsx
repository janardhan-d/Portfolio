import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  Bot
} from 'lucide-react';
import { sectionContexts, getAiResponse } from '../data/jarvisKnowledge';
import Avatar3D from './Avatar3D';

export default function JarvisBot({ activeSection = 'home', onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hello! I am Janardhan's 3D AI Assistant. Feel free to ask me about his technical skills, Finance Manager capstone project, or internship credentials!",
      chips: [
        "Why hire Janardhan?",
        "Tell me about Finance Manager app",
        "How to contact Janardhan?"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Web Audio API Chime Sound
  const playChimeSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  // Voice synthesis helper
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    if (query.toLowerCase().includes('resume')) {
      onOpenResume?.();
    }

    setTimeout(() => {
      playChimeSound();
      const response = getAiResponse(query, activeSection);
      const assistantMsg = {
        sender: 'assistant',
        text: response.text,
        chips: response.chips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(response.text);
    }, 350);
  };

  const activeContext = sectionContexts[activeSection] || sectionContexts.home;
  const lastAssistantMessage = messages.filter(m => m.sender === 'assistant').pop()?.text || "Ask me anything!";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Bottom-Right Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => {
            playChimeSound();
            setIsOpen(true);
          }}
          className="group px-4 py-2.5 rounded-full bg-slate-900/95 border border-amber-500/40 text-white shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] backdrop-blur-md transition-all transform hover:scale-105 flex items-center gap-3"
        >
          {/* Mini Avatar Head Icon */}
          <Avatar3D compact />
          <div className="text-left pr-1">
            <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
              <span>Ask AI Avatar Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Viewing: {activeContext.title}</p>
          </div>
        </button>
      )}

      {/* Main Unified AI Assistant Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] glass-panel rounded-3xl border border-amber-500/50 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-extrabold text-white text-sm">Janardhan's AI Assistant</h3>
                <span className="text-[10px] font-mono text-amber-300">Observing: {activeContext.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-xl transition-colors ${
                  voiceEnabled ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                }`}
                title={voiceEnabled ? 'Voice Enabled' : 'Voice Muted'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Unified 3D Avatar Display Header inside Chat Window */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col items-center justify-center">
            <Avatar3D 
              isSpeaking={isSpeaking} 
              onAvatarClick={() => speakText(lastAssistantMessage)}
              currentSpeech={lastAssistantMessage.length > 70 ? lastAssistantMessage.slice(0, 70) + '...' : lastAssistantMessage}
            />
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-medium">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>

                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                {/* Quick Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {msg.chips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSendMessage(chip)}
                        className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono transition-colors"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI about skills, projects, contact..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
