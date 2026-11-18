import { FeedItem } from "@/components/FeedItem";
import { DRAMAS } from "@/lib/data";

export default function Home() {
  return (
    <div className="no-scrollbar h-[calc(100dvh-4rem)] snap-y snap-mandatory overflow-y-scroll">
      {DRAMAS.map((d) => (
        <FeedItem key={d.id} drama={d} />
      ))}
    </div>
  );
}
