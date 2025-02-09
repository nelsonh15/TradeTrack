'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/nextjs';
import logo from '@/public/1_676b3209491dca001bd2e6ee_94485bdf-fcfa-48bb-a5f4-047157c02236_1024.png';
import Image from 'next/image';

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#fafafa',
          paper: '#f5f5f5',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#212121',
          paper: '#424242',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const NAVIGATION = [
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'charts',
      title: 'Charts',
      icon: <BarChartIcon />,
    },
    {
      segment: 'transactions',
      title: 'Transactions',
      icon: <DescriptionIcon />,
    },
    {
      segment: 'statistics',
      title: 'Statistics',
      icon: <QueryStatsIcon />,
    },
    {
      segment: 'account',
      title: 'Accounts',
      icon: <AccountCircleIcon />
    }
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <Image width={50} src={logo} alt="MUI logo" />,
          title: 'Tradetrack',
          homeUrl: '/dashboard',
        }}
      >
        {children}
      </AppProvider>
    </ThemeProvider>
  );
}
