import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { eq } from "drizzle-orm";

export async function EmailDetails({ emailId }: { emailId: string }) {
  const emailDataFromDB = await db
    .select()
    .from(emails)
    .where(eq(emails.messageId, emailId));
  const emailData = emailDataFromDB[0];

  return (
    <div>
      <h2 className="text-lg font-semibold">Email Details</h2>
      <pre className="border rounded-md p-4 max-w-[75vw] min-h-56 max-h-80 overflow-scroll mt-4 text-sm">
        <code className="" lang="json">
          {JSON.stringify(emailData, null, 2)}
        </code>
      </pre>
    </div>
  );
}
