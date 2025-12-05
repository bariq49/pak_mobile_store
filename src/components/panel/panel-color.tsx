import React from "react";
import ColorSelector from "@/components/panel/panelCardUI/color-selector";
import {usePanel} from "@/hooks/use-panel";
import ThemeToggle from "./panelCardUI/theme-toggle";
import DirectionToggle from "@/components/panel/panelCardUI/direction-toggle";

const PanelColor: React.FC = () => {
    const { groupedByIndustry,activeColorId,setActiveColorId } = usePanel();
    
    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
                <div className="flex justify-between">
                    <ThemeToggle />
                    <DirectionToggle />
                </div>
            </div>
            <ColorSelector groupedByIndustry={groupedByIndustry} activeColorId={activeColorId} setActiveColorId={setActiveColorId} />
        </div>
    );
};

export default PanelColor;