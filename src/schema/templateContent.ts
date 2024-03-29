import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, json } from "drizzle-orm/pg-core";
import { emailTemplates } from "./templates";

export const templateContents = pgTable("template_contents", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  htmlContent: text("html_content").notNull(),
  designJSON: json("design_json").notNull(),
  templateId: uuid("template_id")
    .references(() => emailTemplates.id, { onDelete: "cascade" })
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

export const templateContentsRelations = relations(
  templateContents,
  ({ one }) => ({
    template: one(emailTemplates, {
      fields: [templateContents.templateId],
      references: [emailTemplates.id],
    }),
  }),
);
