
import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import UserProfile from './_components/UserProfile';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tradetrack",
  description: "Stock trading journal web application SaaS",
};
export default function Layout(props: { children: React.ReactNode }) {

  return (
    <DashboardLayout
      slots={{
        toolbarActions: UserProfile
      }}
    >
      <PageContainer maxWidth="xl">
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}
