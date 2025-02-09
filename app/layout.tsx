import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardLayout from "./DashboardLayout";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html suppressHydrationWarning lang="en" data-toolpad-color-scheme="light">
      <body>
        <ClerkProvider>
          <AppRouterCacheProvider options={{}}>
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </AppRouterCacheProvider>
        </ClerkProvider>
      </body>
    </html>

  );
}
