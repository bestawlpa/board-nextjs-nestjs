"use client";
import React from "react";
import "./globals.css";
import Header from "./component/Header";
import { usePathname } from "next/navigation";
import useHydrated from "./hooks/useHydrated";
import { CustomProviders } from "./provider";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = ["/login", "/register"];
  const hydrated = useHydrated();

  if (!hydrated) {
    return null;
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="roboto-light">
        <CustomProviders>
          {!hiddenRoutes.includes(pathname) && <Header />}
          {children}
        </CustomProviders>
      </body>
    </html>
  );
}
