import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import postgres from "postgres";

import { config } from "dotenv";
config();

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

// for migrations
export const migrationClient = postgres({
  database: process.env.POSTGRES_DATABASE!,
  host: process.env.POSTGRES_HOST!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  ssl: true,
  port: 5432,
  max: 1,
});
