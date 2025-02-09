"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Charts", href: "/charts"},
  { name: "Transactions", href: "/transactions"},
  { name: "Statistics", href: "/statistics"}
];

export function Header() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  return (
    <div className="relative w-full">
      <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 lg:px-8 justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className="mr-6 flex items-center space-x-2 select-none cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <span className="hidden font-bold text-xl text-primary sm:inline-block">
                Tradetrack
              </span>
            </h1>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {isClient &&
                navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      pathname === item.href
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UserButton />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
