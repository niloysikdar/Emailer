import { AnalyticsChartArea } from "@/components/analytics-chart-area";
import { SendingAnalyticsCard } from "@/components/sending-analytics-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function AnalyticsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sending Analytics</h2>

      <div className="flex flex-col gap-8">
        <Suspense
          fallback={<Skeleton className="w-full max-w-2xl h-40 rounded-xl" />}
        >
          <SendingAnalyticsCard />
        </Suspense>

        <Suspense
          fallback={
            <Skeleton className="w-full max-w-2xl h-[21rem] rounded-xl" />
          }
        >
          <AnalyticsChartArea />
        </Suspense>
      </div>
    </div>
  );
}
