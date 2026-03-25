import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const jobsTable = pgTable("jobs", {
  id: uuid().primaryKey().defaultRandom(),

  image: text().notNull(),
  cmd: text().default(null),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("update_at").$onUpdate(() => new Date()),
});
