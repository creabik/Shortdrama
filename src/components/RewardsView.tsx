"use client";
import { actions, useUser } from "@/lib/store";

export function RewardsView() {
  const u = useUser();
  const today = new Date().toDateString();
  const done = u.lastCheckin === today;
  const days = Array.from({ length: 7 }, (_, i) => ({ day: i + 1, coins: 10 + i * 5 }));
  return (
    <div className="px-4 pt-6">
      <div className="rounded-2xl bg-gradient-to-br from-pink-600 to-rose-900 p-5">
        <p className="text-sm text-pink-100">My coins</p>
        <p className="mt-1 text-4xl font-bold">🪙 {u.coins}</p>
      </div>
      <h2 className="mt-6 text-xl font-bold">Daily check-in</h2>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {days.map(({ day, coins }) => {
          const claimed = day <= u.streak % 8 && u.streak > 0 && day <= Math.min(u.streak, 7);
          return (
            <div key={day} className={`rounded-lg py-2 text-center text-xs ${claimed ? "bg-pink-500" : "bg-white/10"}`}>
              <p className="text-zinc-200">+{coins}</p><p className="mt-1 text-[10px] opacity-70">D{day}</p>
            </div>
          );
        })}
      </div>
      <button onClick={actions.checkIn} disabled={done}
        className="mt-4 w-full rounded-xl bg-pink-500 py-3 font-semibold disabled:bg-white/10 disabled:text-zinc-500">
        {done ? "Checked in today ✓" : "Check in"}
      </button>
      <h2 className="mt-8 text-xl font-bold">Earn more</h2>
      <ul className="mt-3 space-y-2">
        {[["Watch 3 episodes", "+15"], ["Follow a drama", "+5"], ["Invite a friend", "+50"]].map(([t, c]) => (
          <li key={t} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <span>{t}</span><span className="text-amber-400">{c} 🪙</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
