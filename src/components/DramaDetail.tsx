"use client";
import Link from "next/link";
import type { Drama } from "@/lib/data";
import { actions, useUser } from "@/lib/store";
import { Poster } from "./Poster";
import { ChevronLeft } from "./Icons";

export function DramaDetail({ drama }: { drama: Drama }) {
  const u = useUser();
  const saved = u.list.includes(drama.id);
  const last = u.history[drama.id];
  return (
    <div className="pb-10">
      <div className="relative">
        <Poster drama={drama} hideTitle className="aspect-[3/4] max-h-[60dvh] w-full" />
        <Link href="/theater" className="absolute left-3 top-4 rounded-full bg-black/40 p-1.5"><ChevronLeft className="h-6 w-6" /></Link>
      </div>
      <div className="px-4">
        <h1 className="mt-4 text-2xl font-bold">{drama.title}</h1>
        <p className="mt-1 text-sm text-zinc-400">{drama.episodes} episodes · {drama.genre}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{drama.synopsis}</p>
        <div className="mt-5 flex gap-3">
          <Link href={`/watch/${drama.id}/${last ?? 1}`} className="flex-1 rounded-xl bg-pink-500 py-3 text-center font-semibold">
            {last ? `Continue EP.${last}` : "Watch EP.1"}
          </Link>
          <button onClick={() => actions.toggleList(drama.id)} className={`rounded-xl px-5 font-medium ${saved ? "bg-white/20" : "bg-white/10"}`}>
            {saved ? "Saved ✓" : "+ My List"}
          </button>
        </div>
        <h2 className="mt-7 text-lg font-bold">Episodes</h2>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {Array.from({ length: drama.episodes }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={`/watch/${drama.id}/${n}`} className={`grid h-11 place-items-center rounded-lg text-sm ${n === last ? "bg-pink-500" : "bg-white/10"}`}>{n}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
