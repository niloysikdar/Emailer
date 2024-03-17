"use server";

import { db } from "@/lib/db";
import { templateContents } from "@/schema/templateContent";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateHTMLTemplate({
  title,
  htmlContent,
  designJSON,
  templateId,
  contentId,
}: {
  title: string;
  htmlContent: string;
  designJSON: Record<string, any>;
  templateId: string;
  contentId: string;
}) {
  try {
    await db
      .update(templateContents)
      .set({
        title: title,
        htmlContent: htmlContent,
        designJSON: designJSON,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(templateContents.id, contentId));

    revalidatePath(`/dashboard/templates/${templateId}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
