import { notFound } from "next/navigation";
import { DramaDetail } from "@/components/DramaDetail";
import { DRAMAS, getDrama } from "@/lib/data";

export function generateStaticParams() { return DRAMAS.map((d) => ({ id: d.id })); }

export default async function DramaPage({ params }: PageProps<"/drama/[id]">) {
  const { id } = await params;
  const drama = getDrama(id);
  if (!drama) notFound();
  return <DramaDetail drama={drama} />;
}
