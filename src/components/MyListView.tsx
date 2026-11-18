"use client";
import { useState } from "react";
import { DRAMAS, getDrama } from "@/lib/data";
import { actions, useUser } from "@/lib/store";
import { DramaCard, DramaGrid } from "./DramaGrid";
import { EditIcon } from "./Icons";

export function MyListView() {
  const user = useUser();
  const [editing, setEditing] = useState(false);
  const history = Object.entries(user.history).map(([id, ep]) => ({ d: getDrama(id), ep })).filter((x) => x.d);
  const saved = user.list.map(getDrama).filter(Boolean) as typeof DRAMAS;

  return (
    <div className="pt-5">
      <h1 className="px-4 text-2xl font-bold">Watch History</h1>
      <div className="mt-3">
        {history.length ? (
          <DramaGrid>
            {history.map(({ d, ep }) => (
              <DramaCard key={d!.id} drama={d!} sub={`EP.${String(ep).padStart(2, "0")} / EP.${d!.episodes}`} />
            ))}
          </DramaGrid>
        ) : <p className="px-4 text-sm text-zinc-500">Nothing watched yet.</p>}
      </div>

      <div className="mt-8 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">My List</h2>
        <button onClick={() => setEditing(!editing)} aria-label="Edit list">
          {editing ? <span className="text-sm text-pink-500">Done</span> : <EditIcon className="h-6 w-6" />}
        </button>
      </div>
      <div className="mt-3">
        {saved.length ? (
          <DramaGrid>
            {saved.map((d) => (
              <div key={d.id} className="relative">
                <DramaCard drama={d} sub={`EP.${String(user.history[d.id] ?? 1).padStart(2, "0")} / EP.${d.episodes}`} />
                {editing && (
                  <button onClick={() => actions.toggleList(d.id)} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-pink-500 text-sm" aria-label={`Remove ${d.title}`}>✕</button>
                )}
              </div>
            ))}
          </DramaGrid>
        ) : <p className="px-4 text-sm text-zinc-500">Your list is empty. Save dramas from their detail page.</p>}
      </div>
    </div>
  );
}
