import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from '@clerk/nextjs/server';
import { getStockInfo } from "./stocks";

type Transactions = {
  security_id: string
  account_id: string
  type: string
  price: number
  quantity: number
  date: string
};

type Securities = {
  name: string
  security_id: string
  ticker_symbol: string
  type: string
}

type Transaction_Object = {
  id: string,
  account_id: string
  created_by: string
  created_at: string
  type: string
  price: number
  quantity: number
  stock_name: string
  ticker: string
  transaction_date: string
}

export async function createTransactionsJSON(transactions: Transactions[], securities_json: Securities[]) {
  const user = await currentUser()
  const transaction_list: Array<Transaction_Object> = []
  const tickers = getStockInfo(securities_json);
  for (const item of transactions) {
    const transaction_ticker = tickers[item.security_id]
    const newTransaction = {
      id: uuidv4(),
      account_id: item.account_id,
      created_by: user?.primaryEmailAddress?.emailAddress || "",
      created_at: moment().format("YYYY-MM-DD"),
      type: item.type,
      price: item.price,
      quantity: item.quantity,
      stock_name: transaction_ticker[0],
      ticker: transaction_ticker[1],
      transaction_date: item.date,
    }
    transaction_list.push(newTransaction)
  }
  return transaction_list;
}