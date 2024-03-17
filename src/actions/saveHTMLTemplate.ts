"use server";

import { db } from "@/lib/db";
import { templateContents } from "@/schema/templateContent";
import { revalidatePath } from "next/cache";

export async function saveHTMLTemplate({
  title,
  htmlContent,
  designJSON,
  templateId,
}: {
  title: string;
  htmlContent: string;
  designJSON: Record<string, any>;
  templateId: string;
}) {
  try {
    await db.insert(templateContents).values({
      title: title,
      htmlContent: htmlContent,
      designJSON: designJSON,
      templateId: templateId,
    });

    revalidatePath(`/dashboard/templates/${templateId}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
