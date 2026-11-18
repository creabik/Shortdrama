import { Suspense } from "react";
import { RewardsView } from "@/components/RewardsView";

export default function RewardsPage() {
  return (
    <Suspense>
      <RewardsView />
    </Suspense>
  );
}
