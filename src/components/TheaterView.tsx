"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DRAMAS, GENRES, formatViews } from "@/lib/data";
import { useUser } from "@/lib/store";
import { DramaCard, DramaGrid } from "./DramaGrid";
import { Poster } from "./Poster";
import { FlameIcon, SearchIcon } from "./Icons";

const TABS = ["Featured", "Popular", "Rankings", ...GENRES] as const;

export function TheaterView() {
  const params = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Featured");
  const [slide, setSlide] = useState(0);
  const user = useUser();

  const featured = DRAMAS.filter((d) => d.exclusive).slice(0, 4);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % featured.length), 4000);
    return () => clearInterval(t);
  }, [featured.length]);
  useEffect(() => { if (params.get("search")) inputRef.current?.focus(); }, [params]);

  const ranked = [...DRAMAS].sort((a, b) => b.views - a.views);
  const searching = q.trim().length > 0;
  const results = DRAMAS.filter((d) => (d.title + d.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));

  let body;
  if (searching) {
    body = results.length ? (
      <DramaGrid>{results.map((d) => <DramaCard key={d.id} drama={d} />)}</DramaGrid>
    ) : <p className="px-4 pt-10 text-center text-zinc-500">No dramas found for “{q}”.</p>;
  } else if (tab === "Featured") {
    const d = featured[slide];
    body = (
      <>
        <Link href={`/drama/${d.id}`} className="relative mx-2 block overflow-hidden rounded-xl">
          <Poster drama={d} hideTitle className="aspect-[16/10]" />
          <p className="absolute bottom-4 left-4 right-16 text-xl font-semibold drop-shadow">{d.title}</p>
          <div className="absolute bottom-4 right-4 flex gap-1">
            {featured.map((_, i) => <span key={i} className={`h-1 w-4 rounded ${i === slide ? "bg-white" : "bg-white/30"}`} />)}
          </div>
        </Link>
        <div className="mt-4"><DramaGrid>
          {DRAMAS.filter((x) => x.id !== d.id).map((x) => (
            <DramaCard key={x.id} drama={x} badge={user.following.includes(x.id) ? "Following" : undefined} />
          ))}
        </DramaGrid></div>
      </>
    );
  } else if (tab === "Popular" || tab === "Rankings") {
    const hot = ranked.slice(0, 5);
    body = (
      <>
        {tab === "Popular" && (
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6">
            {hot.map((d) => (
              <Link key={d.id} href={`/drama/${d.id}`} className="relative w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl">
                <Poster drama={d} showTags className="aspect-[4/5]" />
              </Link>
            ))}
          </div>
        )}
        <h2 className="mt-5 flex items-center gap-1.5 px-4 text-xl font-bold">
          {tab === "Popular" ? "Trending Now" : "Top Rankings"} <FlameIcon className="h-5 w-5 text-orange-500" />
        </h2>
        <ol className="mt-3 space-y-2.5 px-3">
          {ranked.map((d, i) => (
            <li key={d.id}>
              <Link href={`/drama/${d.id}`} className="relative flex gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5">
                <span className={`absolute left-0 top-0 rounded-br-lg rounded-tl-xl px-1.5 text-xs font-bold ${i < 3 ? "bg-amber-400 text-black" : "bg-zinc-700"}`}>{i + 1}</span>
                <Poster drama={d} className="h-24 w-[72px] shrink-0 rounded-lg" />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{d.title}</p>
                  <div className="mt-1 flex gap-1.5 text-xs">
                    <span className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5"><FlameIcon className="h-3 w-3 text-orange-500" />{formatViews(d.views)}</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-zinc-300">{d.tags[0]}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs text-zinc-400">{d.synopsis}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </>
    );
  } else {
    const list = DRAMAS.filter((d) => d.genre === tab);
    body = list.length ? <DramaGrid>{list.map((d) => <DramaCard key={d.id} drama={d} />)}</DramaGrid>
      : <p className="px-4 pt-10 text-center text-zinc-500">Nothing here yet.</p>;
  }

  return (
    <div className="pt-3">
      <div className="mx-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5">
        <SearchIcon className="h-5 w-5 text-zinc-300" />
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dramas, genres…"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400" />
      </div>
      <div className="no-scrollbar mt-3 flex gap-5 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button key={t} onClick={() => { setTab(t); setQ(""); }}
            className={`shrink-0 pb-1.5 text-[17px] ${tab === t && !searching ? "border-b-2 border-white font-bold text-white" : "text-zinc-500"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-4">{body}</div>
    </div>
  );
}
