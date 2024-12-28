"use server"
import { NextResponse } from 'next/server';
import { PlaidApi } from 'plaid';
import { config } from '../../app/api/config';

const plaidClient = new PlaidApi(config);

export const get_transactions = async (access_token: string) => {
  try {
    //const { access_token } = await req.json();
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: '2024-01-01',
      end_date: new Date().toISOString().split('T')[0],
    });
    return JSON.parse(JSON.stringify(({ transactions: response.data.transactions })));
  }
  catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Unable to fetch transactions' }, { status: 500 });
  }
}
