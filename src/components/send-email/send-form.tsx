"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Send } from "lucide-react";
import { revalidatePathManually } from "@/actions/revalidatePathManually";

export function SendEmailForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SendEmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      from: "",
      to: "",
      textBody: "",
    },
  });

  async function onSubmit(values: SendEmailFormValues) {
    setIsPending(true);
    const { messageId } = await sendEmail(values);
    setIsPending(false);
    form.reset();

    if (messageId) {
      revalidatePathManually("/dashboard/emails");
      revalidatePathManually("/dashboard/analytics");
      toast.success("Email sent successfully");
    } else toast.error("Failed to send email, please try again later.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="group space-y-4">
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
            name="textBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:ml-0.5 after:text-red-400 after:content-['*'] capitalize">
                  Body of the email (text)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Body of the email in text format"
                    {...field}
                  />
                </FormControl>
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
  );
}
