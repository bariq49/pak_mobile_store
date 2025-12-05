import type {Metadata} from "next";
import {Rubik} from "next/font/google";
import "./globals.css";

import ModalManaged from '@/components/common/modal/modalManaged';
import Providers from "@/app/provider/provider";
import DrawerManaged from "@/components/common/drawer/drawerManaged";

import PanelManaged from "@/components/panel/panel-managed";
import React from "react";

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600'],
});


export const metadata: Metadata = {
    title: {
        template: 'Razor | %s',
        default: 'Razor',
    },
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
        <body className={`${rubik.className}  antialiased bg-background`}>
        <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
                    {children}
                    <PanelManaged/>
                    <ModalManaged/>
                    <DrawerManaged/>
        </Providers>
        </body>
        </html>
    );
}
