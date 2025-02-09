import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Tradetrack | Sign In",
  description: "Sign in to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className='mx-5 md:mx-20 lg:mx-36'>
          {children}
        </div>
      </body>
    </html>
  );
}
