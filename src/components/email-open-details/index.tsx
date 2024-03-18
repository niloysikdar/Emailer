import { db } from "@/lib/db";
import { emailOpens } from "@/schema/emailOpens";
import { eq } from "drizzle-orm";

export async function EmailOpensDetails({ emailId }: { emailId: string }) {
  const emailOpensData = await db
    .select()
    .from(emailOpens)
    .where(eq(emailOpens.messageId, emailId));

  return (
    <div>
      <h2 className="text-lg font-semibold">Email Open Details</h2>
      <pre className="border rounded-md p-4 max-w-[75vw] min-h-56 max-h-80 overflow-scroll mt-4 text-sm">
        <code className="" lang="json">
          {JSON.stringify(emailOpensData, null, 2)}
        </code>
      </pre>
    </div>
  );
}
