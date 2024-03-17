import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function AllSentEmails() {
  const allSentEmails = await db
    .select()
    .from(emails)
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
