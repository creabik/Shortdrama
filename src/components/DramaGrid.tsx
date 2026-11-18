import Link from "next/link";
import type { Drama } from "@/lib/data";
import { Poster } from "./Poster";

export function DramaCard({ drama, badge, sub }: { drama: Drama; badge?: string; sub?: string }) {
  return (
    <Link href={`/drama/${drama.id}`} className="block min-w-0">
      <div className="relative">
        <Poster drama={drama} className="aspect-[3/4] rounded-lg" />
        {badge && <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-pink-500 px-2 py-0.5 text-[11px] font-medium">{badge}</span>}
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-zinc-100">{drama.title}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
    </Link>
  );
}

export function DramaGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-x-2.5 gap-y-4 px-4">{children}</div>;
}
