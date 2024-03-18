"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormDescription } from "@/components/ui/form";

import { formSchema, type SendEmailFormValues } from "./form-schema";
import { sendEmail } from "@/actions/sendEmail";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Send } from "lucide-react";
import { revalidatePathManually } from "@/actions/revalidatePathManually";
import ky from "ky";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { EmailPreview } from "@/components/email-preview";

function SendEmailFormComp() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SendEmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      from: "",
      to: "",
      templateId: "",
    },
  });

  const templateIdValue = form.getValues().templateId;

  const { data: templatesData, isFetching } = useQuery<
    {
      data: {
        title: string;
        id: string;
        description: string;
        createdByUserId: string;
        activeContentId: string | null;
        createdAt: string;
        updatedAt: string;
      }[];
    },
    { message: string }
  >({
    queryKey: ["emailTemplates"],
    queryFn: () => ky.get("/api/templates").json(),
  });

  const { data: htmlData, isFetching: isHTMLFetching } = useQuery<
    {
      title: string;
      html: string;
    },
    { message: string }
  >({
    queryKey: ["emailTemplates", templateIdValue],
    queryFn: () => ky.get(`/api/templates/${templateIdValue}`).json(),
    enabled: !!templateIdValue,
  });

  async function onSubmit(values: SendEmailFormValues) {
    if (!htmlData?.html)
      return toast.error(
        "HTML content is not available for the selected template",
      );

    setIsPending(true);
    const { messageId } = await sendEmail({
      from: values.from,
      to: values.to,
      subject: values.subject,
      htmlBody: htmlData?.html ?? "",
    });
    setIsPending(false);
    form.reset();

    if (messageId) {
      revalidatePathManually("/dashboard/emails");
      revalidatePathManually("/dashboard/analytics");
      toast.success("Email sent successfully");
    } else toast.error("Failed to send email, please try again later.");
  }

  return (
    <div className="flex gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 min-w-96">
          <h2 className="text-lg font-semibold">Send a New Email</h2>

          <fieldset disabled={isPending} className="group space-y-4 pt-3">
            {(["subject", "from", "to"] as const).map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:ml-0.5 after:text-red-400 after:content-['*'] capitalize">
                      {fieldName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          fieldName === "subject"
                            ? "Subject of the email"
                            : fieldName === "from"
                            ? "From (email address)"
                            : "To (email address)"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:ml-0.5 after:text-red-400 after:content-['*'] capitalize">
                    Template Group/Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isFetching}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isFetching}>
                        <SelectValue placeholder="Select an active template to send email" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {templatesData?.data?.map((template) => (
                        <SelectItem
                          key={template.id}
                          value={template.id}
                          disabled={!template.activeContentId}
                        >
                          {template.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email templates from the{" "}
                    <Link
                      href="/dashboard/templates"
                      className="underline underline-offset-1"
                    >
                      Templates Page
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                aria-disabled={isPending}
                disabled={isPending}
              >
                Send Email
                {isPending ? (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>

      {htmlData && !isHTMLFetching && (
        <EmailPreview title={htmlData.title} html={htmlData.html} />
      )}
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function SendEmailForm() {
  return (
    <QueryClientProvider client={queryClient}>
      <SendEmailFormComp />
    </QueryClientProvider>
  );
}
