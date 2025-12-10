"use client";

import BottomNavigation from "@/layouts/header/mobile-navigation";
import BackToTopButton from "@/components/shared/back-to-top";
import Header from "../header";
import Footer from "../footer";

export default function ModernLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="relative flex-grow pt-5 xl:pt-6 "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </main>
      <Footer />
      <BottomNavigation />
      <BackToTopButton />
    </div>
  );
}
