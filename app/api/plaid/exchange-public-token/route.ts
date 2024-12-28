
import { NextRequest, NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { config } from '../../config';

const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { public_token } = await req.json();
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    return NextResponse.json({ access_token: response.data.access_token });
  }
  catch (error) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json({ error: 'Unable to exchange public token' }, { status: 500 });
  }
}
