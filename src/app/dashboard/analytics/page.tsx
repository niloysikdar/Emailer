import { CopyButton } from "@/components/copy-button";
import { SendingAnalyticsCard } from "@/components/sending-analytics-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function AnalyticsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sending Analytics</h2>

      <Suspense
        fallback={<Skeleton className="w-full max-w-2xl h-40 rounded-xl" />}
      >
        <SendingAnalyticsCard />
      </Suspense>
    </div>
  );
}
