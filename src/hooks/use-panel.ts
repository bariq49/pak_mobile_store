import { useEffect, useState } from "react";
import { usePanelStore } from '@/stores/usePanelStore';
import { sortedColorMapArray, SortedColorMapItem } from "@/data/color-settings";

export const usePanel = () => {
    const panelStore = {
        selectedColor: usePanelStore((state) => state.selectedColor),
        selectedTab: usePanelStore((state) => state.selectedTab),
        selectedLayout: usePanelStore((state) => state.selectedLayout),
        selectedFooter: usePanelStore((state) => state.selectedFooter),
        selectedDirection: usePanelStore((state) => state.selectedDirection),
        theme: usePanelStore((state) => state.theme),

        setSelectedColor: usePanelStore((state) => state.setSelectedColor),
        setSelectedTab: usePanelStore((state) => state.setSelectedTab),
        setSelectedLayout: usePanelStore((state) => state.setSelectedLayout),
        setSelectedFooter: usePanelStore((state) => state.setSelectedFooter),
        setSelectedDirection: usePanelStore((state) => state.setSelectedDirection),
        setThemeZustand: usePanelStore((state) => state.setThemeZustand),
    };

    // Create a unique identifier by combining key, id, and industry
    const getUniqueColorId = (colorObj: SortedColorMapItem): string => {
        return `${colorObj.key}-${colorObj.id}-${colorObj.industry}`;
    };

    // Find the initial selected color and set its unique ID
    const initialColor = sortedColorMapArray.find((c) => c.key === panelStore.selectedColor);
    const initialUniqueId = initialColor
        ? getUniqueColorId(initialColor)
        : sortedColorMapArray.length > 0
            ? getUniqueColorId(sortedColorMapArray[0])
            : "";

    const [activeColorId, setActiveColorId] = useState<string>(initialUniqueId);

    // Group colors by industry, ensuring no duplicates within an industry
    const groupedByIndustry = sortedColorMapArray.reduce((acc, colorObj) => {
        const industryKey = colorObj.industry || "No Industry";
        if (!acc[industryKey]) {
            acc[industryKey] = [];
        }
        if (!acc[industryKey].some((c) => getUniqueColorId(c) === getUniqueColorId(colorObj))) {
            acc[industryKey].push(colorObj);
        }
        return acc;
    }, {} as Record<string, SortedColorMapItem[]>);

    const toggleThemeDirection = () => {
        const useLayoutDirection = panelStore.selectedDirection === "ltr" ? "rtl" : "ltr";
        panelStore.setSelectedDirection(useLayoutDirection);
    };

    // Sync document direction with selectedDirection
    useEffect(() => {
        document.documentElement.dir = panelStore.selectedDirection as string;
    }, [panelStore.selectedDirection]);

    return {
        ...panelStore,
        groupedByIndustry,
        activeColorId,
        setActiveColorId,
        toggleThemeDirection,
    };
};