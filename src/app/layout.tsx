import type {Metadata} from "next";
import {Rubik} from "next/font/google";
import "./globals.css";

import ModalManaged from '@/components/common/modal/modalManaged';
import Providers from "@/app/provider/provider";
import DrawerManaged from "@/components/common/drawer/drawerManaged";
import NextTopLoader from "nextjs-toploader";
import PanelManaged from "@/components/panel/panel-managed";
import React from "react";
import { Toaster } from "react-hot-toast";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "Emberidge | %s",
    default: "Emberidge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${rubik.className}  antialiased bg-background`}>
        <NextTopLoader />
        <Toaster />
        <Providers>
          {children}
          <ModalManaged />
          <DrawerManaged />
        </Providers>
      </body>
    </html>
  );
}
