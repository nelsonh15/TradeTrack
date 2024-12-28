"use server"
import { NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { config } from '../../app/api/config';

const plaidClient = new PlaidApi(config);

export const exchange_public_token = async (public_token: string) => {
  try {
    //const { public_token } = await req.json();
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    return JSON.parse(JSON.stringify({ access_token: response.data.access_token }));
  }
  catch (error) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json({ error: 'Unable to exchange public token' }, { status: 500 });
  }
}
