"use client"
import React, { useState } from 'react'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import EditAccountName from './EditAccountName';
import { deleteAccountHandler } from './actions/actions';
import RefreshAccount from './RefreshAccount';

interface AccountCardProps {
  account: {
    id: string;
    created_by: string;
    access_token: string;
    createdName: string;
    accountName: string;
    brokerage: string;
    portfolio_value: string;
    logo: string;
    created_at: string | null;
  };
}
function AccountCard({ account }: AccountCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const formattedPortfolioValue = parseFloat(account.portfolio_value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <Accordion sx={{ maxWidth: '70vw', width: '100%', borderBottom: '1px solid', }}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: 'flex', width: '100%', paddingLeft: 5, }}>
            <Image
              alt="logo"
              src={`data:image/png;base64,${account.logo}`}
              width={50}
              height={50}
              style={{
                borderRadius: '90%',
                objectFit: 'cover',
                objectPosition: 'center ',
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 6 }}>
              <Typography variant="h5" component="div">
                {account.createdName}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setEditDialogOpen(true)}>
              <EditSharpIcon />
            </IconButton>

            <form action={deleteAccountHandler}>
              <input type="hidden" name="id" value={account.id} />
              <IconButton type="submit">
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </form>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <Typography variant="h6" color="text.primary">
                Account
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {account.accountName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <Typography variant="h6" color="text.primary">
                Brokerage
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {account.brokerage}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <Typography variant="h6" color="text.primary">
                Portfolio
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {formattedPortfolioValue}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>

        <AccordionActions>
          <RefreshAccount access_token={account.access_token}/>
        </AccordionActions>
      </Accordion>
      <EditAccountName
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        accountId={account.id}
        currentName={account.createdName}
      />
    </>
  )
}

export default AccountCard