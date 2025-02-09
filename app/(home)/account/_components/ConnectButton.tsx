import { Button } from '@mui/material'
import { useFormStatus } from "react-dom";
import React from 'react'

function ConnectButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ?
        <Button type="submit" disabled={true} autoFocus>
          Adding...
        </Button> :
        <Button type="submit" autoFocus>
          Ok
        </Button>
      }
    </div>
  )
}

export default ConnectButton