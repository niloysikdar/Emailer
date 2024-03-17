"use server";

import { postmarkClient } from "@/lib/postmark";
import type { SendEmailFormValues } from "@/components/send-email/form-schema";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { auth } from "@/lib/auth";

export async function sendEmail(
  values: SendEmailFormValues,
): Promise<{ messageId: string | null }> {
  const { subject, from, to, textBody } = values;

  try {
    const { session } = await auth();

    const { MessageID } = await postmarkClient.sendEmail({
      From: from,
      To: to,
      Subject: subject,
      TextBody: textBody,
      TrackOpens: true,
    });

    await db.insert(emails).values({
      messageId: MessageID,
      subject: subject,
      from: from,
      to: to,
      textBody: textBody,
      senderId: session.user.id,
    });

    return { messageId: MessageID };
  } catch (error) {
    console.log(error);
    return { messageId: null };
  }
}
