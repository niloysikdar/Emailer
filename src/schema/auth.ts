import { timestamp, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});
