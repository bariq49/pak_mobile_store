import React, { FC } from "react";
import { Globe } from 'lucide-react';
import cn from 'classnames';
import { useIsMounted } from "@/utils/use-is-mounted";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface IProps {
    className?: string;
};

const Direction:FC<IProps> = (className) => {
    const { selectedColor,toggleThemeDirection,selectedDirection } = usePanel();
    const mounted = useIsMounted();

    return (
        <div className={cn("menuItem group cursor-pointer mx-2 md:mx-3",className)}>
            <div className="flex items-center h-full">
                <button
                    onClick={toggleThemeDirection}
                    className={cn(
                        "flex items-center justify-center h-6 gap-1 transition-colors  font-base",
                        colorMap[selectedColor].hoverLink
                    )}
                >
                    <Globe size={15} /> 
                    {mounted && selectedDirection === "rtl" ? 'AR' : 'EN'}
                </button>
            </div>
        </div>
    )
};

export default Direction;