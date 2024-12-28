
import { NextRequest, NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { config } from '../../config';

const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();
    const response = await plaidClient.investmentsTransactionsGet({
      access_token,
      start_date: '2023-01-01',
      end_date: new Date().toISOString().split('T')[0]
    });
    return NextResponse.json({ 
      accounts: response.data.accounts, 
      securities: response.data.securities, 
      investment_transactions: response.data.investment_transactions, 
      total_investment_transactions: response.data.total_investment_transactions 
    });
  }
  catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Unable to fetch transactions' }, { status: 500 });
  }
}
