"use client";
import Link from "next/link";
import { useUser } from "@/lib/store";
import { ChevronRight } from "./Icons";

export function ProfileView() {
  const u = useUser();
  const rows = [["My List", "/my-list", `${u.list.length}`], ["Following", "/my-list", `${u.following.length}`], ["Rewards", "/rewards", `${u.coins} 🪙`]];
  return (
    <div className="px-4 pt-8">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-pink-500 text-2xl font-bold">G</div>
        <div><p className="text-lg font-semibold">Guest</p><p className="text-sm text-zinc-400">Sign in to sync across devices</p></div>
      </div>
      <button className="mt-5 w-full rounded-xl bg-white/10 py-3 font-medium" disabled>Sign in (coming soon)</button>
      <ul className="mt-6 divide-y divide-white/5 rounded-xl bg-white/5">
        {rows.map(([l, h, v]) => (
          <li key={l}><Link href={h} className="flex items-center justify-between px-4 py-4"><span>{l}</span><span className="flex items-center gap-1 text-zinc-400">{v}<ChevronRight className="h-4 w-4" /></span></Link></li>
        ))}
      </ul>
    </div>
  );
}
