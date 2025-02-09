import { Button } from '@mui/material'
import React from 'react'
import { useFormStatus } from "react-dom";
import { refreshAccount } from './actions/actions';

interface RefreshAccountProps {
  access_token: string
}

function RefreshAccount({ access_token }: RefreshAccountProps) {
  const { pending } = useFormStatus();
  const refreshAccountHandler = async () => {
    const message = await refreshAccount(access_token);
    alert(message); 
  };
  return (
    <div>
      {pending ?
        <Button type="submit" disabled={true} autoFocus>
          Refreshing...
        </Button> :
        <Button onClick={refreshAccountHandler} type="submit" autoFocus>
          Refresh
        </Button>
      }
    </div>
  )
}

export default RefreshAccount