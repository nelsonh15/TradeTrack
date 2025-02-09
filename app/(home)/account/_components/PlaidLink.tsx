"use client"
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CheckIcon from '@mui/icons-material/Check';

interface PlaidObject {
  access_token: string
  account_info: Array<AccountInfo>
  holdings: Array<object>
  institution: {
    name: string
    logo: string
  }
  securities: Array<object>
  transactions: Array<object>
}

interface AccountInfo {
  name: string
  account_id: string
  balances: {
    current: number
  }
}
interface PlaidLinkProps {
  onSuccess: (data: PlaidObject) => void; // Update to pass data
}
const PlaidLink: React.FC<PlaidLinkProps> = ({ onSuccess }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create-link-token', { 
        method: 'POST' 
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    };
    createLinkToken();
  }, []);

  const onPlaidSuccess = async (publicToken: string) => {
    // Exchange public token for access token
    const exchangeResponse = await fetch('/api/plaid/exchange-public-token', {
      method: 'POST',
      body: JSON.stringify({ public_token: publicToken }),
    });
    const { access_token } = await exchangeResponse.json();

    //Fetch transactions
    const transactionsResponse = await fetch('/api/plaid/get-investment-transactions', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    });
    const data = await transactionsResponse.json();
    console.log('data', data)

    // Fetch holdings
    const holdingsResponse = await fetch('/api/plaid/get-holdings', {
      method: 'POST', 
      body: JSON.stringify({ access_token })
    });
    const data2 = await holdingsResponse.json();
    console.log('data2', data2)

    // Get institution info.
    const institution_info = await fetch('/api/plaid/get-institutions-info', {
      method: 'POST',
      body: JSON.stringify({ institution_id: data.item.institution_id })
    })
    const data3 = await institution_info.json();
    
    const plaidData = {
      access_token: access_token,
      account_info: data.accounts,
      transactions: data.investment_transactions,
      holdings: data2.holdings,
      securities: data2.securities,
      institution: data3.institution,
    };
    setConnected(true)
    onSuccess(plaidData);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess: onPlaidSuccess,
  });

  return (
    <div>
      {!connected ?
        <Button startIcon={<AddLinkIcon/>} variant="contained" onClick={() => open()} disabled={!ready}>
          Connect
        </Button> :
        <Button startIcon={<CheckIcon/>} variant="contained" disabled>
          Connected
        </Button>
      }
    </div>
  );
};

export default PlaidLink;
