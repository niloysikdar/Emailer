import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { emails } from "./emails";

export const linkClicks = pgTable("link_clicks", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  messageId: text("message_id")
    .references(() => emails.messageId, { onDelete: "cascade" })
    .notNull(),
  clickLocation: text("click_location").notNull(),
  originalLink: text("original_link").notNull(),
  clickClientName: text("click_client_name").notNull(),
  clickPlatform: text("click_platform").notNull(),
  clickedAt: timestamp("clicked_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const linkClicksRelations = relations(linkClicks, ({ one }) => ({
  email: one(emails, {
    fields: [linkClicks.messageId],
    references: [emails.messageId],
  }),
}));
