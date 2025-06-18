import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  name: text('name').notNull().unique(),
});

export const content = pgTable('content', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  link: text('link'),
  title: text('title').notNull(),
  tags: uuid('tags').notNull().references(() => tags.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const link = pgTable('link', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  url: text('url').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
