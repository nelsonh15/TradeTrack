import { Box, Divider, Typography } from '@mui/material';
import AddNewAccount from '../account/_components/AddNewAccount';
import React from 'react'
import DynamicBox from '../account/_components/DynamicBox';
import AccountList from '../account/_components/AccountList';

export default async function Account() {

  return (
    <div>
      <DynamicBox>
        <Box sx={{ paddingTop: 3, paddingLeft: 3 }}>
          <Typography> Connect a brokerage account to Tradetrack</Typography>
        </Box>
        <Box sx={{ padding: 3 }}>
          <AddNewAccount />
        </Box>
        <Divider sx={{ opacity: 1 }} variant="fullWidth" />
        <Box sx={{ padding: 3 }}>
          <Typography> Your connected accounts</Typography>
        </Box>
        <Box sx={{padding: 3}}>
          <AccountList />
        </Box>
      </DynamicBox>
    </div>
  );
}