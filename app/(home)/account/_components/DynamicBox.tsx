"use client";

import { Box } from '@mui/material';
import React from 'react';

export default function DynamicBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#424242',
      })}
    >
      {children}
    </Box>
  );
}
