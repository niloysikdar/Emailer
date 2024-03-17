import { z } from "zod";

export const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject is too short",
  }),
  from: z.string().email({
    message: "Invalid email",
  }),
  to: z.string().email({
    message: "Invalid email",
  }),
  textBody: z.string().min(6, {
    message: "Text body is too short",
  }),
});

export type SendEmailFormValues = z.infer<typeof formSchema>;
