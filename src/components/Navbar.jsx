import React, { useState, useEffect } from 'react';
import { Coins, Wallet, User, LogOut } from 'lucide-react';

export default function Navbar({ onNavigate, user, onLogin, onLogout }) {
  const [openAuth, setOpenAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) setOpenAuth(false);
  }, [user]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-blue-950/50 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <Coins className="text-yellow-400" />
          <span className="font-bold tracking-wide">GoldRush</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button className="hover:text-yellow-300" onClick={() => onNavigate('home')}>Home</button>
          <button className="hover:text-yellow-300" onClick={() => onNavigate('game')}>Play</button>
          <button className="hover:text-yellow-300" onClick={() => onNavigate('dashboard')}>Dashboard</button>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
                <User size={16} />
                <span className="text-xs">{user.name || user.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/90 hover:bg-red-500 text-white text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300"
            >
              <Wallet size={18} /> Login / Register
            </button>
          )}
        </div>
      </div>

      {openAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-xl bg-blue-900 text-white border border-white/10 shadow-xl">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-semibold">Welcome to GoldRush</h3>
              <p className="text-sm text-white/70">Sign in to track coins, withdraw to DANA, and view your history.</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-yellow-400"
                />
              </div>
              <button
                onClick={() => onLogin({ email, name })}
                className="w-full py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300"
              >
                Continue with Email
              </button>
              <button
                onClick={() => alert('Google OAuth will be enabled in the full release.')}
                className="w-full py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10"
              >
                Continue with Google
              </button>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setOpenAuth(false)} className="text-sm text-white/70 hover:text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
