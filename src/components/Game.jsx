import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MousePointerClick, Zap, ShieldAlert } from 'lucide-react';

// Simple anti-bot: enforce human reaction timing and max clicks per second
const MAX_CLICKS_PER_SECOND = 6; // generous for mobile taps

export default function Game({ onSessionEnd }) {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const clicksRef = useRef([]);

  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (running && timeLeft === 0) {
      setRunning(false);
      onSessionEnd(score);
    }
    return () => clearTimeout(timer);
  }, [running, timeLeft, score, onSessionEnd]);

  const start = () => {
    setScore(0);
    setTimeLeft(15);
    setMessage('');
    clicksRef.current = [];
    setRunning(true);
  };

  const handleClick = () => {
    if (!running) return;
    const now = Date.now();
    // Rate limiting: keep only clicks in last 1000ms
    clicksRef.current = clicksRef.current.filter((t) => now - t < 1000);
    clicksRef.current.push(now);
    if (clicksRef.current.length > MAX_CLICKS_PER_SECOND) {
      setMessage('Unusual activity detected. Slow down.');
      return;
    }
    setScore((s) => s + 1);
  };

  const multiplier = useMemo(() => (score >= 50 ? 3 : score >= 25 ? 2 : 1), [score]);
  const sessionCoins = useMemo(() => Math.floor(score / 20) * multiplier, [score, multiplier]);

  return (
    <section className="relative w-full bg-blue-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quick Tap Race</h2>
          <button
            onClick={start}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300"
          >
            <Zap size={18} /> {running ? 'Restart' : 'Start'}
          </button>
        </div>
        <p className="mt-2 text-white/70">Tap as fast as you can for 15 seconds. Every 20 taps = 1 coin. Hit streaks increase multipliers.</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Time" value={`${timeLeft}s`} />
          <Stat label="Taps" value={score} />
          <Stat label="Multiplier" value={`x${multiplier}`} />
          <Stat label="Coins this session" value={sessionCoins} highlight />
        </div>

        {message && (
          <div className="mt-4 flex items-center gap-2 text-amber-300">
            <ShieldAlert size={18} /> <span className="text-sm">{message}</span>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleClick}
            disabled={!running}
            className={`w-full h-48 rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-900 font-extrabold text-3xl flex items-center justify-center shadow-xl transition-transform active:scale-95 ${
              running ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <MousePointerClick className="mr-2" /> TAP!
          </button>
        </div>

        {!running && score > 0 && (
          <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-4">
            <h3 className="font-semibold">Session complete</h3>
            <p className="text-sm text-white/70">You earned {sessionCoins} coins this session.</p>
            <button
              onClick={() => onSessionEnd(sessionCoins)}
              className="mt-3 px-4 py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300"
            >
              Add to balance
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10 bg-white/5'}`}>
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className={`mt-1 text-xl font-bold ${highlight ? 'text-yellow-300' : ''}`}>{value}</div>
    </div>
  );
}
