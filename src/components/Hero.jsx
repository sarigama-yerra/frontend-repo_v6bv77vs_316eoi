import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, ShieldCheck, Trophy } from 'lucide-react';

export default function Hero({ onPlay }) {
  return (
    <section className="relative min-h-[80vh] w-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs tracking-wide">
            <ShieldCheck size={14} className="text-yellow-300" /> Secure payouts via DANA Indonesia
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Play. Win. Withdraw.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Earn real cash from every coin.</span>
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Simple mini‑games. Instant feedback. 1 coin = $50. Convert to IDR and withdraw to your DANA wallet with a tap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={onPlay} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-blue-900 font-semibold shadow-lg shadow-yellow-400/30 hover:bg-yellow-300">
              <Rocket size={18} /> Play Now
            </button>
            <a href="#how" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20">
              <Trophy size={18} className="text-yellow-300" /> How it works
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-blue-950/90" />
    </section>
  );
}
