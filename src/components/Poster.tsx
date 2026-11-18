import type { Drama } from "@/lib/data";

/** Placeholder poster art generated from the drama's hue. Swap for <Image> once you have real covers. */
export function Poster({
  drama, className = "", showTags = false, hideTitle = false,
}: { drama: Drama; className?: string; showTags?: boolean; hideTitle?: boolean }) {
  const h = drama.hue;
  return (
    <div
      className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 70% at 50% 25%, hsl(${h} 70% 55% / .9), transparent 60%),
          linear-gradient(160deg, hsl(${h} 60% 30%), hsl(${(h + 40) % 360} 55% 12%) 70%, #0b0810)`,
      }}
    >
      <div
        className="absolute left-1/2 top-[18%] h-[38%] w-[46%] -translate-x-1/2 rounded-full opacity-30 blur-2xl"
        style={{ background: `hsl(${(h + 20) % 360} 90% 75%)` }}
      />
      {drama.exclusive && (
        <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
          ▶ EXCLUSIVE
        </span>
      )}
      {!hideTitle && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 pt-10">
        <p className="font-serif text-[15px] italic leading-tight text-amber-100 drop-shadow">
          {drama.title.split(/[:,]/)[0]}
        </p>
        {showTags && (
          <div className="mt-1 flex gap-1">
            {drama.tags.map((t) => (
              <span key={t} className="rounded bg-white/15 px-1.5 py-0.5 text-[9px]">{t}</span>
            ))}
          </div>
        )}
      </div>}
    </div>
  );
}
