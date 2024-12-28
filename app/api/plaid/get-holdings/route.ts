
import { NextRequest, NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { config } from '../../config';

const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();
    const response = await plaidClient.investmentsHoldingsGet({
      access_token,
    });
    return NextResponse.json({ accounts: response.data.accounts, holdings: response.data.holdings, securities: response.data.securities });
  }
  catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Unable to fetch transactions' }, { status: 500 });
  }
}
