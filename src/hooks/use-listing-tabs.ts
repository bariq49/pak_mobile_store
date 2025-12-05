'use client';
import { useState, useTransition } from 'react';

export const useListingTabs = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [isPending, startTransition] = useTransition();

    const handleTabClick = (category: number) => {
        startTransition(() => {
            setActiveTab(category);
        });
    };

    return {
        activeTab,
        isPending,
        handleTabClick,
    };
};
