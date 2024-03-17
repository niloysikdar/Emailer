import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { AnalyticsLineChart } from "@/components/analytics-line-chart";
import { eq } from "drizzle-orm";

export async function AnalyticsChartArea() {
  const allSentEmailsData = await db
    .select({ sentAt: emails.sentAt })
    .from(emails);

  const chartDataObject: Record<
    string,
    { sentCount: number; deliveredCount: number; bouncedCount: number }
  > = {};

  allSentEmailsData.forEach((email) => {
    const formattedDate = new Date(email.sentAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (chartDataObject[formattedDate]) {
      chartDataObject[formattedDate].sentCount++;
    } else {
      chartDataObject[formattedDate] = {
        sentCount: 1,
        deliveredCount: 0,
        bouncedCount: 0,
      };
    }
  });

  const allDeliveredEmailsData = await db
    .select({ sentAt: emails.sentAt })
    .from(emails)
    .where(eq(emails.deliveryStatus, "DELIVERED"));

  allDeliveredEmailsData.forEach((email) => {
    const formattedDate = new Date(email.sentAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (chartDataObject[formattedDate]) {
      chartDataObject[formattedDate].deliveredCount++;
    } else {
      chartDataObject[formattedDate] = {
        sentCount: 0,
        deliveredCount: 1,
        bouncedCount: 0,
      };
    }
  });

  const bouncedEmailsData = await db
    .select({ sentAt: emails.sentAt })
    .from(emails)
    .where(eq(emails.deliveryStatus, "BOUNCED"));

  bouncedEmailsData.forEach((email) => {
    const formattedDate = new Date(email.sentAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (chartDataObject[formattedDate]) {
      chartDataObject[formattedDate].bouncedCount++;
    } else {
      chartDataObject[formattedDate] = {
        sentCount: 0,
        deliveredCount: 0,
        bouncedCount: 1,
      };
    }
  });

  const chartData = Object.keys(chartDataObject).map((date) => {
    return {
      date,
      sentCount: chartDataObject[date].sentCount,
      deliveredCount: chartDataObject[date].deliveredCount,
      bouncedCount: chartDataObject[date].bouncedCount,
    };
  });

  return (
    <div>
      <AnalyticsLineChart
        chartData={chartData}
        totalCount={{
          Sent: allSentEmailsData.length,
          Delivered: allDeliveredEmailsData.length,
          Bounced: bouncedEmailsData.length,
        }}
      />
    </div>
  );
}
