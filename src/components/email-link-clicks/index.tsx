import { db } from "@/lib/db";
import { linkClicks } from "@/schema/linkClicks";
import { eq } from "drizzle-orm";

export async function EmailLinkClickDetails({ emailId }: { emailId: string }) {
  const emailLinkClicksData = await db
    .select()
    .from(linkClicks)
    .where(eq(linkClicks.messageId, emailId));

  return (
    <div>
      <h2 className="text-lg font-semibold">Email Link Clicks</h2>
      <pre className="border rounded-md p-4 max-w-[75vw] min-h-56 max-h-80 overflow-scroll mt-4 text-sm">
        <code className="" lang="json">
          {JSON.stringify(emailLinkClicksData, null, 2)}
        </code>
      </pre>
    </div>
  );
}
