import { desc } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { emailTemplates } from "@/schema/templates";
import { formatDistance } from "date-fns";
import { cn } from "@/lib/utils";

export async function AllTemplates() {
  const allTemplates = await db
    .select()
    .from(emailTemplates)
    .orderBy(desc(emailTemplates.updatedAt));

  return (
    <div className="flex gap-8 flex-wrap">
      {allTemplates.length === 0 && (
        <p className="font-medium mt-10">
          No Template Category found. Create one now.
        </p>
      )}

      {allTemplates.map((template) => (
        <Link
          key={template.id}
          href={`/dashboard/templates/${template.id}`}
          passHref
        >
          <Card className="max-w-md min-w-96">
            <CardContent className="p-6">
              <p className="text-lg font-bold">{template.title}</p>

              <p className="text-base font-medium text-muted-foreground mt-1 mb-4">
                {template.description}
              </p>

              <div className="flex items-center gap-2 my-3 font-medium text-sm">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full",
                    !!template.activeContentId ? "bg-green-500" : "bg-red-500",
                  )}
                ></div>
                <p>
                  {!!template.activeContentId
                    ? "Active HTML Template"
                    : "No Active HTML Template"}
                </p>
              </div>

              <p className="text-sm font-medium">
                Created{" "}
                {formatDistance(new Date(template.createdAt), new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </p>

              <p className=" text-sm font-medium">
                Last Updated{" "}
                {formatDistance(new Date(template.updatedAt), new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
