import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { emails } from "./emails";

export const emailOpens = pgTable("email_opens", {
  id: uuid("id").defaultRandom().primaryKey(),
  openClientName: text("open_client_name").notNull(),
  openPlatform: text("open_platform").notNull(),
  messageId: text("message_id")
    .references(() => emails.messageId, { onDelete: "cascade" })
    .notNull(),
  openedAt: timestamp("opened_at", {
    mode: "string",
    withTimezone: true,
  }),
});

export const emailOpensRelations = relations(emailOpens, ({ one }) => ({
  email: one(emails, {
    fields: [emailOpens.messageId],
    references: [emails.messageId],
  }),
}));
