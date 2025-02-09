import { Button } from '@mui/material';
import React from 'react'
import { useFormStatus } from "react-dom";

function EditAccountNameButton() {

  const { pending } = useFormStatus();
  return (
    <div>
      {pending ?
        <Button type="submit" disabled={true} autoFocus>
          Editing...
        </Button> :
        <Button type="submit" autoFocus>
          Ok
        </Button>
      }
    </div>
  )
}

export default EditAccountNameButton