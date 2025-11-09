import React, { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import InfoSections from './components/InfoSections';

const USD_PER_COIN = 50;

export default function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);

  const onLogin = (payload) => {
    if (!payload?.email) return;
    const profile = { email: payload.email, name: payload.name || payload.email.split('@')[0] };
    setUser(profile);
  };

  const onLogout = () => {
    setUser(null);
  };

  const addCoins = useCallback((coins) => {
    if (!coins || coins <= 0) return;
    setBalance((b) => b + coins);
    setHistory((h) => [{ type: 'Earn', amount: coins, date: new Date().toISOString() }, ...h]);
    setRoute('dashboard');
  }, []);

  const onWithdraw = useCallback(() => {
    if (balance <= 0) return;
    const danaNumber = prompt('Enter your DANA number to request withdrawal:');
    if (!danaNumber) return;
    setHistory((h) => [{ type: 'Withdraw', amount: balance, date: new Date().toISOString(), to: danaNumber }, ...h]);
    alert(`Withdrawal requested to DANA ${danaNumber}. You will receive approximately $${(balance * USD_PER_COIN).toLocaleString()}.
Converted to IDR at processing time.`);
    setBalance(0);
  }, [balance]);

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <Navbar onNavigate={setRoute} user={user} onLogin={onLogin} onLogout={onLogout} />

      {route === 'home' && (
        <>
          <Hero onPlay={() => setRoute('game')} />
          <InfoSections />
        </>
      )}

      {route === 'game' && (
        <Game onSessionEnd={addCoins} />
      )}

      {route === 'dashboard' && (
        <Dashboard user={user} balance={balance} history={history} onWithdraw={onWithdraw} />
      )}

      <footer className="border-t border-white/10 bg-blue-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-sm text-white/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} GoldRush — Play to earn.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => alert('About Us: We build playful fintech experiences.')} className="hover:text-yellow-300">About Us</button>
            <button onClick={() => alert('Support: help@goldrush.app')} className="hover:text-yellow-300">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
