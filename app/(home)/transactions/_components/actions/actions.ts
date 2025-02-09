"use server"
import { db } from "@/lib/db";
import { desc, eq } from 'drizzle-orm';
import { accounts, transactions, portfolio } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import moment from "moment";

export const editTransactionHandler = async (updatedRow: any) => {
  const formattedDate = moment(updatedRow.transaction_date).format('YYYY-MM-DD');
  try {
    await db
      .update(transactions)
      .set({
        stock_name: updatedRow.stock_name,
        ticker: updatedRow.ticker,
        price: updatedRow.price,
        quantity: updatedRow.quantity,
        transaction_date: formattedDate,
        type: updatedRow.type,
      })
      .where(eq(transactions.id, updatedRow.id));
    console.log("Transaction updated successfully.");
    revalidatePath('/transactions');
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

export const deleteTransactionHandler = async (id: string) => {
  try {
    await db
      .delete(transactions)
      .where(eq(transactions.id, id));
    console.log("Transactions deleted successfully.");
    revalidatePath('/transactions');
  } catch (error) {
    console.error("Error deleting account:", error);
  }
}