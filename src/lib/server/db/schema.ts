import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    email: varchar("email", { length: 254 }).notNull(),
    username: varchar("username", { length: 32 }).notNull(),
    passwordHash: varchar("password_hash", { length: 98 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_user_email").on(table.email),
    uniqueIndex("idx_user_username").on(table.username),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
}));

export const session = pgTable(
  "session",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: varchar("user_id", { length: 64 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [index("idx_session_user_id").on(table.userId)],
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
