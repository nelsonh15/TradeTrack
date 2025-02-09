import React from 'react';
import { unstable_cache } from 'next/cache';
import { db } from "@/lib/db";
import { accounts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import AccountCard from './AccountCard';
import { Box } from '@mui/material';
import { currentUser } from '@clerk/nextjs/server';

const getAccounts = unstable_cache(
  async (userEmail: string) => {
    return await db
      .select()
      .from(accounts)
      .where(eq(accounts.created_by, userEmail))
      .orderBy(desc(accounts.created_at));
  },
  ['accounts'],
  { revalidate: 3600, tags: ['accounts'] }
);

async function AccountList() {
  const user = await currentUser(); // Fetch the authenticated user

  if (!user) {
    return <div>Please log in to see your accounts.</div>;
  }

  const userEmail = user.primaryEmailAddress?.emailAddress || '';
  const allAccounts = await getAccounts(userEmail);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {allAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </Box>
    </div>
  );
}

export default AccountList;
