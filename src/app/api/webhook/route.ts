import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { emails } from "@/schema/emails";
import type {
  DeliveryWebhookData,
  BounceWebhookData,
  OpenWebhookData,
} from "@/app/types/webhookData";
import { emailOpens } from "@/schema/emailOpens";

export async function POST(request: Request) {
  try {
    const text = await request.text();

    // Process the webhook payload
    const jsonData = JSON.parse(text) as
      | DeliveryWebhookData
      | BounceWebhookData
      | OpenWebhookData;

    // Log the webhook payload, which will be helpful for debugging
    // We're using console statements here for now, but you can use any logger like Winston or Pino
    console.info(`${jsonData.RecordType} webhook received:`);
    console.info(jsonData);
    console.log("-------------------");

    if (jsonData.RecordType === "Delivery") {
      await updateEmailDeliveryStatus({
        messageId: jsonData.MessageID,
        status: "DELIVERED",
        updatedAt: jsonData.DeliveredAt,
      });
    } else if (jsonData.RecordType === "Bounce") {
      await updateEmailDeliveryStatus({
        messageId: jsonData.MessageID,
        status: "BOUNCED",
        updatedAt: jsonData.BouncedAt,
        reason: jsonData.Details,
      });
    } else if (jsonData.RecordType === "Open") {
      await db.insert(emailOpens).values({
        openClientName: jsonData.Client.Name,
        openPlatform: jsonData.Platform,
        messageId: jsonData.MessageID,
        openedAt: jsonData.ReceivedAt,
      });

      if (jsonData.FirstOpen) {
        await db
          .update(emails)
          .set({ opened: true })
          .where(eq(emails.messageId, jsonData.MessageID));
      }
    }
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}

async function updateEmailDeliveryStatus({
  messageId,
  status,
  updatedAt,
  reason,
}: {
  messageId: string;
  status: "DELIVERED" | "BOUNCED";
  updatedAt: string;
  reason?: string;
}) {
  await db
    .update(emails)
    .set({
      deliveryStatus: status,
      deliveryStatusUpdatedAt: updatedAt,
      bounceReason: reason || null,
    })
    .where(eq(emails.messageId, messageId));
}
