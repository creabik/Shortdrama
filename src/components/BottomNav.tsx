"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookmarkIcon, GiftIcon, HomeIcon, PlayIcon, UserIcon } from "./Icons";

const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/theater", label: "Theater", Icon: PlayIcon },
  { href: "/my-list", label: "My List", Icon: BookmarkIcon },
  { href: "/rewards", label: "Rewards", Icon: GiftIcon },
  { href: "/profile", label: "Profile", Icon: UserIcon },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-16 max-w-md items-center justify-around border-t border-white/5 bg-[#0b0810]/95 backdrop-blur">
      {TABS.map(({ href, label, Icon }) => {
        const active = href === "/" ? path === "/" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={`flex w-16 flex-col items-center gap-0.5 text-[11px] ${active ? "text-pink-500" : "text-zinc-400"}`}>
            <Icon className={label === "Rewards" ? "h-7 w-7 text-amber-400" : "h-6 w-6"} fill={active && (label === "Home" || label === "My List") ? "currentColor" : "none"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
