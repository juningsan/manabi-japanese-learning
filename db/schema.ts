import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
};
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    image: text("image"),
    ...timestamps,
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);
export const grammar = sqliteTable("grammar", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  meaning: text("meaning").notNull(),
  structure: text("structure"),
  jlptLevel: text("jlpt_level").notNull(),
  explanation: text("explanation"),
  ...timestamps,
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const words = sqliteTable("words", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kanji: text("kanji"),
  kana: text("kana").notNull(),
  meaning: text("meaning").notNull(),
  partOfSpeech: text("part_of_speech"),
  jlptLevel: text("jlpt_level"),
  example: text("example"),
  ...timestamps,
});
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  ...timestamps,
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const favorites = sqliteTable(
  "favorites",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    targetType: text("target_type", { enum: ["grammar", "word"] }).notNull(),
    targetId: integer("target_id").notNull(),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("favorites_target_idx").on(t.userId, t.targetType, t.targetId),
  ],
);
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  targetType: text("target_type", { enum: ["grammar", "word"] }).notNull(),
  targetId: integer("target_id").notNull(),
  result: text("result", { enum: ["again", "good", "easy"] }).notNull(),
  reviewedAt: text("reviewed_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
