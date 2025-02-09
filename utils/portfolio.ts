import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from '@clerk/nextjs/server'
import { getStockInfo, getQuantityInfo, getPriceInfo } from "./stocks";

type Securities = {
  name: string | ""
  security_id: string
  account_id: string
  type: string
  price: number
  quantity: number
  date: string
  ticker_symbol: string | ""
  option_contract: {
    contract_type: string
    strike_price: number
    expiration_date: string
    underlying_security_ticker: string
  }
};

type Holdings = {
  name: string
  account_id: string
  security_id: string
  ticker_symbol: string
  quantity: number
  institution_price: number
}

type Portfolio_Object = {
  id: string,
  account_id: string
  created_by: string
  created_at: string
  option: boolean
  contract_type: string | null
  strike: number | null
  expiration: string | null
  name: string
  ticker: string
  type: string
  quantity: number
  price: number
  security_id: string
}

export async function createPortfolioJSON(securities_json: Securities[], holdings_json: Holdings[]) {
  const user = await currentUser()
  const portfolio_list: Array<Portfolio_Object> = []
  const stock_info = getStockInfo(securities_json);
  const quantity_info = getQuantityInfo(holdings_json);
  const price_info = getPriceInfo(holdings_json);
  const account_id = holdings_json[0].account_id

  for (const item of securities_json) {
    const transaction_ticker = stock_info[item.security_id]
    const newHolding = {
      id: uuidv4(),
      account_id: account_id,
      created_by: user?.primaryEmailAddress?.emailAddress || "",
      created_at: moment().format("YYYY-MM-DD"),
      option: (item.type=="derivative" ? true:false),
      contract_type: (item.type=="derivative" && item.option_contract ? item.option_contract.contract_type:null),
      strike: (item.type=="derivative" && item.option_contract ? item.option_contract.strike_price:null),
      expiration: (item.type=="derivative" && item.option_contract ? item.option_contract.expiration_date:null),
      name: (item.type=="derivative" && item.option_contract ? item.option_contract.underlying_security_ticker:item.name),
      ticker: transaction_ticker[1],
      type: item.type,
      quantity: quantity_info.get(item.security_id),
      price: price_info.get(item.security_id),
      security_id: item.security_id,
    }
    portfolio_list.push(newHolding)
  }

  return portfolio_list;
}