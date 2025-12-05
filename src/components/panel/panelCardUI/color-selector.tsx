import React from "react";
import { SortedColorMapItem } from "@/data/color-settings";
import { Check } from "lucide-react";
import { Tooltip } from "@/components/shared/tooltip";
import cn from "classnames";
import {usePanel} from "@/hooks/use-panel";

interface ColorSelectorProps {
    groupedByIndustry: Record<string, SortedColorMapItem[]>;
    activeColorId: string;
    setActiveColorId: (id: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
                                                         groupedByIndustry,
                                                         activeColorId,
                                                         setActiveColorId,
                                                     }) => {
    const { setSelectedColor } = usePanel();
    const handleClickActive = (color: string, colorObj: SortedColorMapItem) => {
        setSelectedColor(color);
        setActiveColorId(
            `${colorObj.key}-${colorObj.id}-${colorObj.industry}`
        );
    };
    
    return (
        <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
            <div className="space-y-6">
                {Object.entries(groupedByIndustry).map(([industry, colors]) => (
                    <div key={industry}>
                        <h4 className="text-15px font-medium capitalize mb-2">{industry}</h4>
                        <div className="grid grid-cols-5 gap-4">
                            {colors.map((colorObj) => {
                                const uniqueColorId = `${colorObj.key}-${colorObj.id}-${colorObj.industry}`;
                                return (
                                    <div key={uniqueColorId} className="text-center space-y-1">
                                        <Tooltip content={`${colorObj.name}`}>
                                            <button
                                                className={cn(
                                                    `relative h-15 w-15 rounded-xl transition duration-300 ${colorObj.bg} hover:opacity-100 transition-all`,
                                                    {
                                                        "opacity-90 inset-shadow-sm": activeColorId !== uniqueColorId,
                                                        "drop-shadow-md": activeColorId === uniqueColorId,
                                                    }
                                                )}
                                                onClick={() => handleClickActive(colorObj.key, colorObj)}
                                            >
                                                {activeColorId === uniqueColorId && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Check className="w-6 h-6 text-brand-light animate-in zoom-in duration-200" />
                                                    </div>
                                                )}
                                            </button>
                                        </Tooltip>
                                        <p className="hidden text-xs font-medium capitalize">{colorObj.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;