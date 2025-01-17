import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  uniqueIndex,
  index,
  time,
  text,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 254 }).notNull(),
  passwordHash: varchar("password_hash", { length: 98 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const adminRelations = relations(admin, ({ many }) => ({
  categories: many(category),
}));

export const category = pgTable(
  "category",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    adminId: varchar("admin_id", { length: 64 })
      .notNull()
      .references(() => admin.id, {
        onDelete: "cascade",
      }),
    name: varchar("name", { length: 64 }).notNull(),
    description: text("description").notNull(),
    properties: jsonb("properties").notNull().$type<{ [key: string]: string }>(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("idx_category_name").on(table.name)],
);

export const categoryRelations = relations(category, ({ one, many }) => ({
  admin: one(admin, { fields: [category.adminId], references: [admin.id] }),
  items: many(item),
}));

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

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  vendor: one(vendor, { fields: [user.id], references: [vendor.userId] }),
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

export const weekday = pgEnum("weekday", ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
export const vendor = pgTable(
  "vendor",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: varchar("user_id", { length: 64 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    vendorname: varchar("name", { length: 64 }).notNull(),
    openAt: time("start_at", { withTimezone: true }).notNull(),
    closeAt: time("close_at", { withTimezone: true }).notNull(),
    days: weekday("weekday").array().notNull(),
    description: text("description").notNull(),
    address: text("address").notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 254 })
      .notNull()
      .references(() => user.email, { onDelete: "cascade" }),
    socialMedia: jsonb("social_media").notNull().$type<{ [key: string]: string }>(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_vendor_user_id").on(table.userId),
    index("idx_vendor_vendorname_search").using(
      "gin",
      sql`to_tsvector('english', ${table.vendorname})`,
    ),
    index("idx_vendor_email").on(table.email),
    index("idx_vendor_phone").on(table.phone),
    index("idx_vendor_address_search").using("gin", sql`to_tsvector('english', ${table.address})`),
  ],
);

export const vendorRelations = relations(vendor, ({ one, many }) => ({
  user: one(user, { fields: [vendor.userId], references: [user.id] }),
  items: many(item),
}));

export const item = pgTable(
  "item",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    vendorId: varchar("vendor_id", { length: 64 })
      .notNull()
      .references(() => vendor.id, { onDelete: "cascade" }),
    categoryId: varchar("category_id", { length: 64 })
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 64 }).notNull(),
    description: text("description").notNull(),
    price: varchar("price", { length: 10 }).notNull(),
    properties: jsonb("properties").notNull().$type<{ [key: string]: string }>(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_item_vendor_id").on(table.vendorId),
    index("idx_item_category_id").on(table.categoryId),
    index("idx_item_name_search").using("gin", sql`to_tsvector('english', ${table.name})`),
  ],
);

export const itemRelations = relations(item, ({ one }) => ({
  vendor: one(vendor, { fields: [item.vendorId], references: [vendor.id] }),
  category: one(category, { fields: [item.categoryId], references: [category.id] }),
}));

export type User = typeof user.$inferSelect;
export type Admin = typeof admin.$inferSelect;
export type Vendor = typeof vendor.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Category = typeof category.$inferSelect;
