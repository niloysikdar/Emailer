import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { emailTemplates } from "@/schema/templates";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { CreateTemplateButton } from "./create-template-button";

export async function CreateNewTemplate() {
  const { session } = await auth();

  async function createTemplate(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await db.insert(emailTemplates).values({
      title,
      description,
      createdByUserId: session.user.id,
    });

    revalidatePath("/dashboard/templates");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Template</DialogTitle>
          <DialogDescription>
            Create a new template to use in your emails
          </DialogDescription>
        </DialogHeader>
        <form action={createTemplate}>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Template Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Sign Up Email"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Template Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="This is a email for Sign Up"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <CreateTemplateButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
