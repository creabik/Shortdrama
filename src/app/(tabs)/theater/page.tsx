import { Suspense } from "react";
import { TheaterView } from "@/components/TheaterView";

export default function TheaterPage() {
  return (
    <Suspense>
      <TheaterView />
    </Suspense>
  );
}
