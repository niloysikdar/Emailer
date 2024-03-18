import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/lib/auth";

export async function AllSentEmails() {
  const { session } = await auth();

  const allSentEmails = await db
    .select()
    .from(emails)
    .where(eq(emails.senderId, session?.user.id))
    .orderBy(desc(emails.sentAt));

  return (
    <div>
      <p className="text-base font-medium mb-4">
        Total Count: {allSentEmails.length}
      </p>

      <DataTable columns={columns} data={allSentEmails} />
    </div>
  );
}
