import React from 'react'
import TransactionsList from './_components/TransactionsList'
import { Box } from '@mui/material'

export default function Transactions() {
  return (
    <div>
      <Box sx={{padding: 3}}>
        <TransactionsList />
      </Box>
      
    </div>
  )
}
