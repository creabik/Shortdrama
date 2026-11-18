import type { SVGProps } from "react";
const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...p,
});
export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>);
export const PlayIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></svg>);
export const BookmarkIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>);
export const GiftIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="8" width="18" height="4" /><path d="M5 12v9h14v-9M12 8v13M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0" /></svg>);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>);
export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>);
export const CommentIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6A8 8 0 1 1 21 12z" /></svg>);
export const ShareIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M14 4l7 7-7 7v-4c-6 0-9 2-11 6 0-7 4-11 11-12z" /></svg>);
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 5l7 7-7 7" /></svg>);
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>);
export const EditIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7" /><path d="M18 3l3 3-9 9H9v-3z" /></svg>);
export const FlameIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z" /></svg>);
export const ListIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 6h16M4 12h16M4 18h10" /></svg>);
