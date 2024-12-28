
import { NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { CountryCode, Products } from 'plaid';
import { auth } from '@clerk/nextjs/server';
import { config } from '../../config';

const plaidClient = new PlaidApi(config);

export async function POST() {
  const { userId } = await auth();

  // Check if userId exists
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Creating Plaid Link Token for user:', userId);

    // Create Plaid Link Token
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'Tradetrack',
      products: ['investments'] as Products[],
      country_codes: ['US'] as CountryCode[],
      language: 'en',
    });

    console.log('Plaid Link Token created:', response.data);
    return NextResponse.json({ link_token: response.data.link_token });
    //return JSON.parse(JSON.stringify({ link_token: response.data.link_token }));
  }
  catch (error) {
    console.error('Plaid API Error:', error);
    return NextResponse.json({ error: error || 'Unable to create link token' }, { status: 500 });
  }
}
