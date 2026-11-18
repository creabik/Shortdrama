"use client";
import { useSyncExternalStore } from "react";

export type UserState = {
  following: string[];
  list: string[];
  history: Record<string, number>; // dramaId -> last watched episode
  coins: number;
  lastCheckin: string | null;
  streak: number;
};

const KEY = "shortdrama:v1";
const DEFAULT: UserState = {
  following: ["love-triangle-father", "doctor-billionaire"],
  list: ["slumber-regret", "engagement-banquet", "divorce-fabulous", "ceo-housekeeper", "twin-sister-fiance", "million-dollar-job"],
  history: { "race-to-heart": 17, "runaway-luna": 48, "secret-child-boss": 3 },
  coins: 120,
  lastCheckin: null,
  streak: 0,
};

let state: UserState = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT, ...JSON.parse(raw) };
  } catch {}
}

function set(next: UserState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => {
  if (!loaded && typeof window !== "undefined") load();
  return state;
};

export const useUser = () => useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT);

const toggle = (arr: string[], id: string) =>
  arr.includes(id) ? arr.filter((x) => x !== id) : [id, ...arr];

export const actions = {
  toggleFollow: (id: string) => set({ ...getSnapshot(), following: toggle(getSnapshot().following, id) }),
  toggleList: (id: string) => set({ ...getSnapshot(), list: toggle(getSnapshot().list, id) }),
  setProgress: (id: string, ep: number) =>
    set({ ...getSnapshot(), history: { ...getSnapshot().history, [id]: ep } }),
  checkIn: () => {
    const s = getSnapshot();
    const today = new Date().toDateString();
    if (s.lastCheckin === today) return;
    set({ ...s, lastCheckin: today, streak: s.streak + 1, coins: s.coins + 10 + Math.min(s.streak, 6) * 5 });
  },
};
