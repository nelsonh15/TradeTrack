
import { PlaidApi } from 'plaid';
import { config } from '../../config';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Plaid client
const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { userAccessToken, latest_date } = await req.json();
    const response = await plaidClient.investmentsRefresh({
      access_token: userAccessToken,
    });

    const response2 = await plaidClient.investmentsHoldingsGet({
      access_token: userAccessToken,
    });

    const response3 = await plaidClient.investmentsTransactionsGet({
      access_token: userAccessToken,
      start_date: latest_date,
      end_date: new Date().toISOString().split('T')[0]
    });
    return NextResponse.json({
      response: response.data.request_id,
      holdings: response2.data.holdings, 
      securities: response2.data.securities,
      accounts: response3.data.accounts,
      transactions: response3.data.investment_transactions
    })

  } catch (error) {
    console.error('Error refreshing investments:', error);
  }
}


