"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_VIDEO, type Drama } from "@/lib/data";
import { actions } from "@/lib/store";
import { ChevronLeft } from "./Icons";

export function Player({ drama, ep }: { drama: Drama; ep: number }) {
  const router = useRouter();
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasNext = ep < drama.episodes;

  useEffect(() => { actions.setProgress(drama.id, ep); }, [drama.id, ep]);

  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); } else { v.pause(); setPaused(true); }
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      <video key={ep} ref={ref} src={SAMPLE_VIDEO} autoPlay playsInline muted={false} className="h-full w-full object-cover" onClick={toggle}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
        onEnded={() => hasNext && router.push(`/watch/${drama.id}/${ep + 1}`)} />
      {paused && <button onClick={toggle} className="absolute inset-0 grid place-items-center text-6xl text-white/80">▶</button>}
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-gradient-to-b from-black/60 to-transparent p-3">
        <Link href={`/drama/${drama.id}`}><ChevronLeft className="h-7 w-7" /></Link>
        <p className="truncate text-sm font-medium">{drama.title}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-16">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>EP.{ep} / {drama.episodes}</span>
          <div className="flex gap-2">
            {ep > 1 && <Link replace href={`/watch/${drama.id}/${ep - 1}`} className="rounded-full bg-white/20 px-3 py-1">Prev</Link>}
            {hasNext && <Link replace href={`/watch/${drama.id}/${ep + 1}`} className="rounded-full bg-white/20 px-3 py-1">Next</Link>}
            <button onClick={() => setSheet(true)} className="rounded-full bg-white/20 px-3 py-1">Episodes</button>
          </div>
        </div>
        <div className="h-0.5 rounded bg-white/25"><div className="h-full rounded bg-white" style={{ width: `${progress * 100}%` }} /></div>
      </div>
      {sheet && (
        <div className="absolute inset-0 z-10 flex items-end bg-black/60" onClick={() => setSheet(false)}>
          <div className="max-h-[60%] w-full overflow-y-auto rounded-t-2xl bg-[#17121c] p-4" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 font-semibold">Episodes</p>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: drama.episodes }, (_, i) => i + 1).map((n) => (
                <Link replace key={n} href={`/watch/${drama.id}/${n}`} onClick={() => setSheet(false)}
                  className={`grid h-11 place-items-center rounded-lg text-sm ${n === ep ? "bg-pink-500" : "bg-white/10"}`}>{n}</Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
