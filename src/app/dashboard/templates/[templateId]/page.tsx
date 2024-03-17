import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { templateContents } from "@/schema/templateContent";
import { emailTemplates } from "@/schema/templates";
import { formatDistance } from "date-fns";
import { desc, eq } from "drizzle-orm";
import { Pencil, PlusCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { MakeActiveButton } from "@/components/make-active-button";
import { CreateNewHTMLTemplateDialog } from "@/components/create-new-html-template-dialog";

export default async function TemplatePage({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId } = params;

  const templateDataFromDB = await db
    .select()
    .from(emailTemplates)
    .where(eq(emailTemplates.id, templateId));
  const templateData = templateDataFromDB[0];

  const templateContentsFromDB = await db
    .select()
    .from(templateContents)
    .where(eq(templateContents.templateId, templateId))
    .orderBy(desc(templateContents.updatedAt));

  return (
    <div>
      <div className="flex items-center mb-4 gap-16">
        <h2 className="text-lg font-semibold">{templateData.title}</h2>

        <CreateNewHTMLTemplateDialog templateId={templateData.id} />
      </div>

      <div className="flex gap-8 flex-wrap">
        {templateContentsFromDB.length === 0 && (
          <p className="font-medium mt-10">
            No HTML Templates found for &quot;{templateData.title}&quot;. Create
            one now.
          </p>
        )}

        {templateContentsFromDB.map((content) => {
          const isActive =
            (templateData.activeContentId &&
              templateData.activeContentId === content.id) ||
            false;

          return (
            <Card key={content.id} className="max-w-md min-w-96">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <p className="text-lg font-bold mb-2">{content.title}</p>

                  {isActive && (
                    <div className="flex items-center gap-2 font-medium text-sm">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <p>
                        Active HTML Template for &quot;{templateData.title}
                        &quot;
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium mt-2">
                    Created{" "}
                    {formatDistance(new Date(content.createdAt), new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </p>

                  <p className=" text-sm font-medium">
                    Last Updated{" "}
                    {formatDistance(new Date(content.updatedAt), new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </p>

                  <div className="flex gap-4 mt-6">
                    <form
                      action={async () => {
                        "use server";

                        await db
                          .update(emailTemplates)
                          .set({
                            activeContentId: content.id,
                            updatedAt: new Date().toISOString(),
                          })
                          .where(eq(emailTemplates.id, templateId));

                        revalidatePath(`/dashboard/templates/${templateId}`);
                      }}
                    >
                      <MakeActiveButton isActive={isActive} />
                    </form>
                    <Link
                      href={`/dashboard/templates/${templateData.id}/${content.id}/edit`}
                      passHref
                    >
                      <Button variant="outline">
                        Edit
                        <Pencil className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
