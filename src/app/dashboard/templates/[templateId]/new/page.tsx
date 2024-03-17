import { NewEmailEditor } from "@/components/new-email-editor";

export default async function NewHTMLPage({
  params,
}: {
  params: { templateId: string };
}) {
  return (
    <div>
      <NewEmailEditor templateId={params.templateId} />
    </div>
  );
}
