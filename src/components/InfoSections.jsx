import React from 'react';
import { HelpCircle, Info, ShieldCheck } from 'lucide-react';

export default function InfoSections() {
  return (
    <section id="how" className="w-full bg-blue-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <h3 className="text-2xl font-bold">How it works</h3>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>• Create an account with email or continue with Google.</li>
            <li>• Play lightweight games and earn coins based on your score.</li>
            <li>• 1 coin = $50. Convert to IDR automatically using live rates.</li>
            <li>• Withdraw safely to your DANA wallet in Indonesia.</li>
          </ul>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <h3 className="text-2xl font-bold">Withdrawals to DANA</h3>
          <p className="mt-4 text-white/80">
            Enter your DANA number at withdrawal. Payouts are processed securely. Typical processing time: 5–15 minutes.
            Make sure your account name matches your DANA profile to avoid delays.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
            <ShieldCheck size={18} /> Protected by risk checks and rate limits.
          </div>
        </div>

        <div className="rounded-2xl p-6 border border-white/10 bg-white/5 md:col-span-2">
          <h3 className="text-2xl font-bold flex items-center gap-2"><Info size={22} /> FAQ</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <Faq q="Is this free to play?" a="Yes. Games are free and funded by sponsors and promotions." />
            <Faq q="How do I earn coins?" a="Play the mini‑games. Your session score converts into coins with multipliers for streaks." />
            <Faq q="What about cheating?" a="We track click rates and behavior. Unusual activity reduces rewards or blocks sessions." />
            <Faq q="Which countries are supported?" a="Withdrawals are available to Indonesia via DANA for now." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ q, a }) {
  return (
    <div className="rounded-xl p-4 border border-white/10 bg-white/5">
      <div className="font-semibold">{q}</div>
      <div className="mt-1 text-white/80 text-sm">{a}</div>
    </div>
  );
}
