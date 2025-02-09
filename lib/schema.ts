import { pgTable, varchar, boolean, real } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
    id: varchar("id").primaryKey().notNull(),
    access_token: varchar("access_token").notNull(),
    created_by: varchar("created_by").notNull(),
    createdName: varchar("created_name").notNull(),
    accountName: varchar("account_name").notNull(),
    brokerage: varchar("brokerage").notNull(),
    portfolio_value: varchar("portfolio_value").notNull(),
    logo: varchar("logo").notNull(),
    created_at: varchar("created_at"),
})

export const transactions = pgTable("transactions", {
    id: varchar("id").primaryKey().notNull(),
    account_id: varchar("account_id").notNull(),
    created_by: varchar("created_by").notNull(),
    created_at: varchar("created_at"),
    type: varchar("type").notNull(),
    price: real("price").notNull(),
    quantity: real("quantity").notNull(),
    stock_name: varchar("stock_name"),
    ticker: varchar("ticker"),
    transaction_date: varchar("transaction_date").notNull(),
})

export const portfolio = pgTable("portfolio", {
    id: varchar("id").primaryKey().notNull(),
    account_id: varchar("account_id").notNull(),
    created_by: varchar("created_by").notNull(),
    created_at: varchar("created_at"),
    option: boolean("option"),
    contract_type: varchar("contract_type"),
    strike: real("strike"),
    expiration: varchar("expiration"),
    name: varchar("name"),
    ticker: varchar("ticker"),
    type: varchar("type"),
    quantity: real("quantity"),
    price: real("price"),
    security_id: varchar("security_id").notNull(),
})