import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, pgEnum, boolean } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { users } from "./auth";
import { emailOpens } from "./emailOpens";
import { linkClicks } from "./linkClicks";

export const deliveryStatusEnum = pgEnum("delivery_status", [
  "SENDING",
  "DELIVERED",
  "BOUNCED",
]);

export const emails = pgTable("emails", {
  messageId: text("message_id").notNull().primaryKey(),
  subject: text("subject").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  textBody: text("text_body").notNull(),
  senderId: text("sender_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  sentAt: timestamp("sent_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  deliveryStatus: deliveryStatusEnum("delivery_status")
    .notNull()
    .default("SENDING"),
  deliveryStatusUpdatedAt: timestamp("delivery_status_updated_at", {
    mode: "string",
    withTimezone: true,
  }),
  bounceReason: text("bounce_reason"),
  opened: boolean("opened").notNull().default(false),
});

export const emailsRelations = relations(emails, ({ one, many }) => ({
  sender: one(users, {
    fields: [emails.senderId],
    references: [users.id],
  }),
  opens: many(emailOpens),
  clicks: many(linkClicks),
}));

export type Email = InferSelectModel<typeof emails> & {
  sender: InferSelectModel<typeof users>;
};
