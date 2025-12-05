import React, { FC } from "react";
import { usePanel } from '@/hooks/use-panel';
import {  MoonStar, SunMedium } from 'lucide-react';
import cn from 'classnames';
import { useIsMounted } from "@/utils/use-is-mounted";
import { colorMap } from "@/data/color-settings";
import { useTheme } from 'next-themes';

interface IProps {
    className?: string;
}

const SwitchDark:FC<IProps> = (className) => {
    const { theme, setTheme } = useTheme();
    const { selectedColor,setThemeZustand } = usePanel();
    const mounted = useIsMounted();
    
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setThemeZustand(newTheme); //  Sync to Zustand
    };
    
    return (
            <div className={cn("menuItem group cursor-pointer mx-2 md:mx-3",className)}>
                <div className="flex items-center  h-full">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "flex items-center justify-center h-6 w-6 border border-white/30 dark:border-black/30  rounded-full",
                            colorMap[selectedColor].hoverLink
                        )}
                    >
                        {mounted && theme === "dark" ? <MoonStar size={16} /> : <SunMedium size={16} />}
                    </button>
                </div>
            </div>
        )
};

export default SwitchDark;