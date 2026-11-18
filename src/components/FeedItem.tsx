"use client";
import Link from "next/link";
import type { Drama } from "@/lib/data";
import { actions, useUser } from "@/lib/store";
import { Poster } from "./Poster";
import { BookmarkIcon, ChevronRight, CommentIcon, SearchIcon, ShareIcon } from "./Icons";

export function FeedItem({ drama }: { drama: Drama }) {
  const user = useUser();
  const following = user.following.includes(drama.id);

  const share = async () => {
    const url = `${location.origin}/drama/${drama.id}`;
    try {
      if (navigator.share) await navigator.share({ title: drama.title, url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <section className="relative h-[calc(100dvh-4rem)] snap-start overflow-hidden">
      <Link href={`/watch/${drama.id}/${(user.history[drama.id] ?? 0) || 1}`} aria-label={`Play ${drama.title}`}>
        <Poster drama={drama} hideTitle className="absolute inset-0" />
      </Link>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <Link href="/theater?search=1" className="absolute right-4 top-4 rounded-full p-2" aria-label="Search">
        <SearchIcon className="h-7 w-7" />
      </Link>

      <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5 text-xs">
        <button onClick={() => actions.toggleFollow(drama.id)} className="flex flex-col items-center gap-1">
          <BookmarkIcon className={`h-9 w-9 ${following ? "text-pink-500" : ""}`} fill="currentColor" />
          {following ? "Following" : "Follow"}
        </button>
        <Link href={`/drama/${drama.id}`} className="flex flex-col items-center gap-1">
          <CommentIcon className="h-9 w-9" fill="currentColor" />
          {Math.round(drama.views / 190)}
        </Link>
        <button onClick={share} className="flex flex-col items-center gap-1">
          <ShareIcon className="h-9 w-9" fill="currentColor" />
          Share
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-3 px-2">
        <div className="mb-3 flex items-center gap-2.5">
          <Poster drama={drama} hideTitle className="h-14 w-11 shrink-0 rounded" />
          <div className="min-w-0 pr-16">
            <p className="text-[17px] font-semibold leading-tight">{drama.title}</p>
            <div className="mt-1 flex gap-1.5">
              {drama.tags.map((t) => (
                <span key={t} className="rounded bg-white/20 px-2 py-0.5 text-xs backdrop-blur">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <Link href={`/watch/${drama.id}/1`} className="flex items-center justify-center gap-2 rounded-lg bg-white/20 py-3 text-[15px] font-medium backdrop-blur">
          Watch·All {drama.episodes} Episodes <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
