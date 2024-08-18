import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

// Table to store budget information.
export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

// This table stores information about the expenses associated with each budget.
export const Expensess = pgTable("expensess", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdAt: varchar("createdAt").notNull(),
});
