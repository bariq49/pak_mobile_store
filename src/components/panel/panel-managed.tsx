"use client";
import { Palette, Layout, Layers } from 'lucide-react';
import { useUI } from '@/hooks/use-UI';
import { usePanel } from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";

const items = [
    {
        icon: <Palette className="h-6 w-6 transition-all " />,
        label: "Color",
    },
    {
        icon: <Layout className="h-6 w-6 transition-all " />,
        label: "Layout",
    },
    {
        icon: <Layers className="h-6 w-6 transition-all " />,
        label: "Theme",
    },
]

export default function PanelManaged() {
    
    const {openDrawer, setDrawerView} = useUI();
    const { selectedColor,setSelectedTab } = usePanel();

    function handleSidebarOpen(index: number) {
        setDrawerView('PANEL_SIDEBAR');
        setSelectedTab(index);
        
        return openDrawer();
    }
    return (
        <div
            className={cn(
                colorMap[selectedColor].bg,
                "hidden xl:flex flex-col gap-1 fixed z-50 end-0 top-1/2 transform -translate-y-1/2 p-1.5   shadow-md  rounded-s-lg ")}>
            
                {items.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={() => handleSidebarOpen(index)}
                        className={`w-12 h-12 text-brand-light group rounded-full flex items-center justify-center hover:bg-white/20 p-2`}
                        title={item.label}
                    >
                        {item.icon}
                    </button>
                ))}
        </div>
    )
}

