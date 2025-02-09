"use client"
import React from 'react'
import { Box } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { UserButton } from '@clerk/nextjs';

function UserProfile() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0 50px"
      height="100%"
    >
      <Box padding="0 10px">
        <ThemeSwitcher />
      </Box>
      <UserButton />
    </Box>
  )
}

export default UserProfile