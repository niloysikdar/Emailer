import { AllTemplates } from "@/components/all-templates";
import { CreateNewTemplate } from "@/components/all-templates/create-new-template";

export default function TemplatesPage() {
  return (
    <div>
      <div className="flex items-center mb-4 gap-16">
        <h2 className="text-lg font-semibold">
          All Template Groups/Categories
        </h2>

        <CreateNewTemplate />
      </div>

      <AllTemplates />
    </div>
  );
}
