import { EditHTMLTemplate } from "@/components/edit-HTML-template";
import { db } from "@/lib/db";
import { templateContents } from "@/schema/templateContent";
import { eq } from "drizzle-orm";

export default async function EditPage({
  params,
}: {
  params: { templateId: string; contentId: string };
}) {
  const { templateId, contentId } = params;

  const contentDataFromDB = await db
    .select()
    .from(templateContents)
    .where(eq(templateContents.id, contentId));
  const contentData = contentDataFromDB[0];

  return (
    <div>
      <EditHTMLTemplate
        title={contentData.title}
        contentId={contentData.id}
        designJSON={contentData.designJSON as any}
        templateId={templateId}
      />
    </div>
  );
}
