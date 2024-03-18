"use server";

import { postmarkClient } from "@/lib/postmark";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import { auth } from "@/lib/auth";
import { LinkTrackingOptions } from "postmark/dist/client/models";

export async function sendEmail(values: {
  subject: string;
  from: string;
  to: string;
  htmlBody: string;
}): Promise<{ messageId: string | null }> {
  const { subject, from, to, htmlBody } = values;

  try {
    const { session } = await auth();

    const { MessageID } = await postmarkClient.sendEmail({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      TrackOpens: true,
      TrackLinks: LinkTrackingOptions.HtmlAndText,
    });

    await db.insert(emails).values({
      messageId: MessageID,
      subject: subject,
      from: from,
      to: to,
      htmlBody: htmlBody,
      senderId: session.user.id,
    });

    return { messageId: MessageID };
  } catch (error) {
    console.log(error);
    return { messageId: null };
  }
}
