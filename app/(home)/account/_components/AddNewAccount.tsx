"use client"
import { useState, useRef } from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert } from '@mui/material';
import PlaidLink from './PlaidLink';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { handleSubmit } from "./actions/actions";
import ConnectButton from "./ConnectButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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

export default function AddNewAccount() {
  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [plaidData, setPlaidData] = useState<PlaidObject | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  console.log("plaidData", plaidData)
  const handleClickOpen = () => {
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setIsConnected(false)
    setError("");
  };

  const handlePlaidData = (data: PlaidObject) => {
    setPlaidData(data);
  };

  const handlePlaidSuccess = () => {
    setIsConnected(true);
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!name) {
      setError("Please enter a name for the account.");
      return;
    }
    if (!isConnected) {
      setError("Please connect your account via Plaid.");
      return;
    }

    setError("");
    if (ref.current) {
      const accountData = new FormData(ref.current);
      const stockData = new FormData();
      if (plaidData) {
        accountData.append("access_token", plaidData.access_token)
        accountData.append('account_id', plaidData.account_info[0].account_id)
        accountData.append('account_name', plaidData.account_info[0].name)
        accountData.append('brokerage', plaidData.institution.name);
        accountData.append('portfolio_value', plaidData.account_info[0].balances.current.toString());
        accountData.append('logo', plaidData.institution.logo);
        
        stockData.append('transactions', JSON.stringify(plaidData.transactions));
        stockData.append('holdings', JSON.stringify(plaidData.holdings));
        stockData.append('securities', JSON.stringify(plaidData.securities));
        
        await handleSubmit(accountData, stockData);
      }
      else {
        setError("Plaid data is missing.");
        return;
      }
      ref.current.reset();
      setOpen(false);
      setName("");
      setIsConnected(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Connect
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add an account
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 12,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form ref={ref} onSubmit={handleSubmitForm}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <TextField required margin="dense" id="name" name="name" label="Name" placeholder="Ex. My trading account" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
              {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
              <Box sx={{ paddingTop: 2 }}>
                <PlaidLink onSuccess={(data) => {
                  handlePlaidSuccess();
                  handlePlaidData(data);
                }} />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <ConnectButton />
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}
