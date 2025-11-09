import React from 'react';
import { Coins, DollarSign, CreditCard, History, Wallet } from 'lucide-react';

const USD_PER_COIN = 50;
const IDR_PER_USD = 15500; // approximate live rate; display only

export default function Dashboard({ user, balance, history, onWithdraw }) {
  const usd = balance * USD_PER_COIN;
  const idr = usd * IDR_PER_USD;

  return (
    <section className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-3xl font-extrabold">Your Dashboard</h2>
        <p className="text-white/70">Track your coins, value, and cash out to DANA.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card icon={<Coins className="text-yellow-300" />} label="Coins" value={balance} accent />
          <Card icon={<DollarSign className="text-yellow-300" />} label="USD Value" value={`$${usd.toLocaleString()}`} />
          <Card icon={<CreditCard className="text-yellow-300" />} label="IDR Value" value={`Rp ${idr.toLocaleString('id-ID')}`} />
          <Card icon={<Wallet className="text-yellow-300" />} label="Payout Method" value="DANA Wallet" />
        </div>

        <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-5">
          <h3 className="font-semibold flex items-center gap-2"><History size={18} /> Transaction History</h3>
          {history.length === 0 ? (
            <p className="text-sm text-white/70 mt-2">No transactions yet. Play a game to earn coins.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {history.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-white/10 py-2">
                  <span>{item.type}</span>
                  <span className="text-white/70">{new Date(item.date).toLocaleString()}</span>
                  <span className={item.type === 'Withdraw' ? 'text-red-300' : 'text-green-300'}>
                    {item.type === 'Withdraw' ? '-' : '+'} {item.amount} coins
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onWithdraw}
            disabled={balance <= 0}
            className={`px-6 py-3 rounded-lg bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300 ${balance <= 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Withdraw to DANA
          </button>
          <p className="text-sm text-white/70">
            Conversion: 1 coin = $50 ≈ Rp {(USD_PER_COIN * IDR_PER_USD).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, label, value, accent }) {
  return (
    <div className={`rounded-xl p-4 border ${accent ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10 bg-white/5'}`}>
      <div className="flex items-center gap-2 text-sm text-white/70">{icon} {label}</div>
      <div className={`mt-2 text-2xl font-bold ${accent ? 'text-yellow-300' : ''}`}>{value}</div>
    </div>
  );
}
