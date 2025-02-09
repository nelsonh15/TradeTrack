type Securities = {
  name: string | ""
  security_id: string
  ticker_symbol: string | ""
  type: string
};

type Holdings = {
  security_id: string
  quantity: number
  institution_price: number
}
type SecurityMap = {
  [key: string]: [string, string];
}

export function getStockInfo(securities: Securities[]) {
  const securityID_ticker:  SecurityMap = {};
  for (const item of securities) {
    securityID_ticker[item.security_id] = [item.name, item.ticker_symbol]
  }
  return securityID_ticker;
}

export function getQuantityInfo(holdings: Holdings[]) {
  const securityID_quantity: Map<string, number> = new Map();
  for (const item of holdings) {
    securityID_quantity.set(item.security_id, item.quantity);
  }
  return securityID_quantity;
}

export function getPriceInfo(holdings: Holdings[]) {
  const securityID_price: Map<string, number> = new Map();
  for (const item of holdings) {
    securityID_price.set(item.security_id, item.institution_price);
  }
  return securityID_price;
}