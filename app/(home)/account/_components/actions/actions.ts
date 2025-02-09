"use server"

import { db } from "@/lib/db";
import { desc, eq } from 'drizzle-orm';
import { accounts, transactions, portfolio } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { currentUser } from '@clerk/nextjs/server'
import { createTransactionsJSON } from "@/utils/transactions";
import { createPortfolioJSON } from "@/utils/portfolio";

export const editAccountName = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  try {
    await db
      .update(accounts)
      .set({ createdName: name })
      .where(eq(accounts.id, id));
    console.log("Account name updated successfully.");
    revalidatePath('/dashboard')
  } catch (error) {
    console.error("Error updating account name:", error);
  }
};

export const deleteAccountHandler = async (formData: FormData) => {
  const id = formData.get("id") as string;
  try {
    await db
      .delete(accounts)
      .where(eq(accounts.id, id));
    console.log("Account deleted successfully.");

    await db
      .delete(transactions)
      .where(eq(transactions.account_id, id));
    console.log("Transactions deleted successfully.")

    await db
      .delete(portfolio)
      .where(eq(portfolio.account_id, id));
    console.log("Portfolio deleted successfully.")

    revalidatePath('/dashboard')
  } catch (error) {
    console.error("Error deleting account:", error);
  }
}

export const handleSubmit = async (accountData: FormData, stockData: FormData) => {
  const createdName = accountData.get("name") as string;
  const access_token = accountData.get("access_token") as string;
  const accountName = accountData.get("account_name") as string;
  const account_id = accountData.get("account_id") as string;
  const brokerage = accountData.get("brokerage") as string;
  const portfolio_value = accountData.get("portfolio_value") as string;
  const logo = accountData.get("logo") as string;
  const user = await currentUser()

  await db
    .insert(accounts)
    .values({
      id: account_id,
      created_by: user?.primaryEmailAddress?.emailAddress || "",
      access_token: access_token,
      createdName: createdName,
      accountName: accountName,
      brokerage: brokerage,
      portfolio_value: portfolio_value,
      logo: logo,
      created_at: moment().format("YYYY-MM-DD")
    }).returning({ id: accounts.id })

  const securities_json = JSON.parse(stockData.get("securities") as string);
  const transactions_json = JSON.parse(stockData.get("transactions") as string);
  if (Object.keys(transactions_json).length != 0) {
    const transaction_list = await createTransactionsJSON(transactions_json, securities_json);
    await db
      .insert(transactions)
      .values(transaction_list).returning({ id: transactions.id })
  }

  const holdings_json = JSON.parse(stockData.get("holdings") as string);
  if (Object.keys(holdings_json).length != 0) {
    const portfolio_list = await createPortfolioJSON(securities_json, holdings_json);
    await db
      .insert(portfolio)
      .values(portfolio_list).returning({ id: portfolio.id })
  }

  revalidatePath('/dashboard')
}

export const refreshAccount = async (access_token: string) => {
  const account_id = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(eq(accounts.access_token, access_token));
    
  const latest_date = await db
    .select({ created_at: transactions.created_at })
    .from(transactions)
    .where(eq(transactions.account_id, account_id[0].id))
    .orderBy(desc(transactions.created_at))
    .limit(1);

  if (Object.keys(latest_date).length == 0) {
    const date = await db
      .select({ created_at: accounts.created_at })
      .from(accounts)
      .where(eq(accounts.access_token, access_token))
    latest_date.push(date[0])
  }
  
  const response = await fetch('http://localhost:3000/api/plaid/investments-refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAccessToken: access_token, latest_date: latest_date[0].created_at })
  });

  if (response.ok) {
    const data = await response.json();
    const accounts_info = data.accounts;

    // Update portfolio value
    await db
      .update(accounts)
      .set({ portfolio_value: accounts_info[0].balances.current.toString() })
      .where(eq(accounts.access_token, access_token));

    // Update holdings by deleting existing data, then inserting updated data
    await db
      .delete(portfolio)
      .where(eq(portfolio.account_id, account_id[0].id));

    const holdings = data.holdings;
    const securities = data.securities;
    if (Object.keys(holdings).length != 0) {
      const portfolio_list = await createPortfolioJSON(securities, holdings);
      await db
        .insert(portfolio)
        .values(portfolio_list).returning({ id: portfolio.id })
    }

    // Update transactions by inserting data from most recent date to present
    const new_transactions = data.transactions;
    if (Object.keys(new_transactions).length != 0) {
      const transaction_list = await createTransactionsJSON(new_transactions, securities);
      await db
        .insert(transactions)
        .values(transaction_list).returning({ id: transactions.id })
    }
  }
  else {
    return "Failed to refresh."
  }
  revalidatePath('/dashboard')
  revalidatePath('/transactions')
  return "Account successfully refreshed."
}