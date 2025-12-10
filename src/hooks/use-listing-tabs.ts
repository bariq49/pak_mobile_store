"use client";
import { useState, useTransition } from "react";

export const useListingTabs = () => {
  // activeTab will store category slug
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (categorySlug: string) => {
    startTransition(() => {
      setActiveTab(categorySlug);
    });
  };

  return {
    activeTab,
    isPending,
    handleTabClick,
  };
};
