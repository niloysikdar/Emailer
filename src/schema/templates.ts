import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { emails } from "./emails";
import { users } from "./auth";

export const emailTemplates = pgTable("email_templates", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdByUserId: text("created_by_user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const emailTemplatesRelations = relations(emailTemplates, ({ one }) => ({
  sender: one(users, {
    fields: [emailTemplates.createdByUserId],
    references: [users.id],
  }),
}));
