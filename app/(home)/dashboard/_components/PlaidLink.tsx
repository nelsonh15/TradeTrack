"use client"
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@mui/material';
import { revalidatePath } from 'next/cache'

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create-link-token', { method: 'POST' });
      const data = await response.json();
      setLinkToken(data.link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = async (publicToken: string) => {
    // Exchange public token for access token
    const exchangeResponse = await fetch('/api/plaid/exchange-public-token', {
      method: 'POST',
      body: JSON.stringify({ public_token: publicToken }),
    });
    const { access_token } = await exchangeResponse.json();

    // Fetch transactions
    const transactionsResponse = await fetch('/api/plaid/get-transactions', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    });
    const data = await transactionsResponse.json();
    console.log('Accounts:', data.accounts);
    console.log('Investment Transactions:', data.investment_transactions);
    console.log('Securities:', data.securities);
    console.log('Item:', data.total_investment_transactions );
    setConnected(true)
  };

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });

  return (
    <div>
      {!connected ?
        <Button variant="contained" onClick={() => open()} disabled={!ready}>
          Connect
        </Button> :
        <Button variant="contained" onClick={() => open()} disabled={connected}>
          Connected
        </Button>
      }
    </div>
  );
};

export default PlaidLink;
