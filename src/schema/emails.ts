import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { users } from "./auth";

export const emails = pgTable("emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  messageId: text("message_id").notNull(),
  subject: text("subject").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  textBody: text("text_body").notNull(),
  senderId: text("sender_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  sentAt: timestamp("sent_at", { mode: "date" }).defaultNow().notNull(),
});

export const emailsRelations = relations(emails, ({ one }) => ({
  sender: one(users, {
    fields: [emails.senderId],
    references: [users.id],
  }),
}));

export type Email = InferSelectModel<typeof emails> & {
  sender: InferSelectModel<typeof users>;
};
