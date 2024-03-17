import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { emails } from "./emails";
import { emailTemplates } from "./templates";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  emails: many(emails),
  emailTemplates: many(emailTemplates),
}));
