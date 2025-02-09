"use client";

import { useRef } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditAccountNameButton from "./EditAccountNameButton";
import { editAccountName } from "./actions/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface EditAccountNameProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
  currentName: string;
}

export default function EditAccountName({ open, onClose, accountId, currentName }: EditAccountNameProps) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit name
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 12,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form
        ref={ref}
        action={async (formData) => {
          await editAccountName(formData);
          ref.current?.reset();
          onClose();
        }}
      >
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input type="hidden" name="id" value={accountId} />
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              defaultValue={currentName}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <EditAccountNameButton />
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
