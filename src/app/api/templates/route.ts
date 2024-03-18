import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { emailTemplates } from "@/schema/templates";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { session } = await auth();

  try {
    const data = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.createdByUserId, session.user.id));
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Failed to fetch email templates" },
      { status: 500 },
    );
  }
}
