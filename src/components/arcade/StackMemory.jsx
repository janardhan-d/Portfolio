import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { memoryCardsList } from '../../data/arcadeData';

export default function StackMemory() {
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

  // Mount = fresh shuffle (the tab only renders this game when active)
  useEffect(() => {
    initMemoryGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
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
              role="button"
              aria-label={isFlipped ? `Card ${card.name}` : 'Hidden memory card'}
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
  );
}
