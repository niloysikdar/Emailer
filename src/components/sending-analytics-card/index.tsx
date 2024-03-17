import { count, eq } from "drizzle-orm";
import { CopyButton } from "@/components/copy-button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { linkClicks } from "@/schema/linkClicks";

function formatNumber(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export async function SendingAnalyticsCard() {
  const [
    allSentemailsData,
    deliveredEmailsData,
    bouncedEmailsData,
    openedEmailsData,
    clickData,
  ] = await Promise.all([
    db.select({ count: count() }).from(emails),
    db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.deliveryStatus, "DELIVERED")),
    db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.deliveryStatus, "BOUNCED")),
    db.select({ count: count() }).from(emails).where(eq(emails.opened, true)),
    db.select({ count: count() }).from(linkClicks),
  ]);

  const totalEmailsCount = allSentemailsData[0].count;
  const deliveredEmailsCount = deliveredEmailsData[0].count;
  const bouncedEmailsCount = bouncedEmailsData[0].count;
  const openedEmailsCount = openedEmailsData[0].count;
  const clickCount = clickData[0].count;
  const deliveryPercentage = formatNumber(
    (deliveredEmailsCount / totalEmailsCount) * 100,
  );
  const bouncePercentage = formatNumber(
    (bouncedEmailsCount / totalEmailsCount) * 100,
  );
  const openedPercentage = formatNumber(
    (openedEmailsCount / totalEmailsCount) * 100,
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6 relative">
        <p className="font-semibold">
          You sent {totalEmailsCount} emails in total.
        </p>

        <p className="font-medium mt-1">
          Out of that{" "}
          <span className="text-green-600 font-semibold">
            {deliveryPercentage}%
          </span>{" "}
          were delivered successfully,{" "}
          <span className="text-red-600 font-semibold">
            {bouncePercentage}%
          </span>{" "}
          bounced back.
        </p>

        <p className="mt-2 font-medium">
          <span className="text-green-600 font-semibold">
            {openedPercentage}%
          </span>{" "}
          of the emails were opened
        </p>

        <p className="mt-2 font-medium">
          Recipients clicked on links a total of{" "}
          <span className="text-blue-600 font-semibold">{clickCount}</span>{" "}
          times.
        </p>

        <div className="absolute top-3 right-3">
          <CopyButton
            text={`You sent ${totalEmailsCount} emails in total.
Out of that ${deliveryPercentage}% were delivered successfully, ${bouncePercentage}% bounced back.
${openedPercentage}% of the emails were opened
Recipients clicked on links a total of ${clickCount} times.`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
