import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Player } from "@/components/Player";
import { getDrama } from "@/lib/data";

async function Episode({ params }: Pick<PageProps<"/watch/[id]/[ep]">, "params">) {
  const { id, ep } = await params;
  const drama = getDrama(id);
  const n = Number(ep);
  if (!drama || !Number.isInteger(n) || n < 1 || n > drama.episodes) notFound();
  return <Player drama={drama} ep={n} />;
}

export default function WatchPage({ params }: PageProps<"/watch/[id]/[ep]">) {
  return (
    <Suspense fallback={<div className="h-dvh bg-black" />}>
      <Episode params={params} />
    </Suspense>
  );
}
