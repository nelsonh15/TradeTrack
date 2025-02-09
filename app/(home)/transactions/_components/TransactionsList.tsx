import React from 'react'
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { unstable_cache } from 'next/cache';
import { transactions } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { currentUser } from '@clerk/nextjs/server';
import TransactionsTable from './TransactionsTable';
import { db } from '@/lib/db';

const getTransactionsList = unstable_cache(
  async (userEmail: string) => {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.created_by, userEmail))
      .orderBy(desc(transactions.created_at));
  },
  ['transactions'],
  { revalidate: 3600, tags: ['transactions'] }
)

async function TransactionsList() {
  const user = await currentUser();

  if (!user) {
    return <div> Please log in to see your transactions. </div>
  }
  const userEmail = user.primaryEmailAddress?.emailAddress || '';
  const transactions = await getTransactionsList(userEmail);
  return (
    <div>
      <Box sx={{ padding: '5px' }}>
        <TransactionsTable transactions={transactions} />
      </Box>
    </div>
  )
}

export default TransactionsList