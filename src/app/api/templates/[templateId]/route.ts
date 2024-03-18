import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { templateContents } from "@/schema/templateContent";
import { emailTemplates } from "@/schema/templates";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } },
) {
  const templateId = params.templateId;

  if (!templateId) {
    return Response.json(
      { message: "Template ID is required" },
      { status: 400 },
    );
  }

  try {
    const templateData = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.id, templateId));

    const activeTemplateContent = await db
      .select()
      .from(templateContents)
      .where(eq(templateContents.id, templateData[0].activeContentId!));

    return Response.json({
      title: activeTemplateContent[0].title,
      html: activeTemplateContent[0].htmlContent,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Failed to fetch template HTML contents" },
      { status: 500 },
    );
  }
}
