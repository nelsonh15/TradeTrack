import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Tradetrack",
  description: "Stock trading journal web application SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
