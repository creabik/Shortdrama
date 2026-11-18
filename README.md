# ShortDrama

A mobile-first short-drama streaming web app built with Next.js (App Router), TypeScript and Tailwind CSS.

## Screens
- **Home** – full-screen vertical feed (scroll-snap) with Follow / Comments / Share and "Watch All N Episodes"
- **Theater** – search, Featured banner, Popular carousel + Trending list, Rankings, genre tabs
- **My List** – Watch History with episode progress and saved dramas (editable)
- **Rewards** – coins and daily check-in streak
- **Profile** – guest profile (sign-in placeholder)
- **/drama/[id]** – detail page with episode grid · **/watch/[id]/[ep]** – vertical player with next/prev and episode sheet

## Run
```bash
npm install
npm run dev
```

## Where to plug in real content
- `src/lib/data.ts` – dramas, episodes count, and `SAMPLE_VIDEO` (replace with per-episode HLS/MP4 URLs)
- `src/components/Poster.tsx` – generated placeholder art; swap for real cover images
- `src/lib/store.ts` – user state (follows, list, history, coins) in localStorage; replace with an API/database
