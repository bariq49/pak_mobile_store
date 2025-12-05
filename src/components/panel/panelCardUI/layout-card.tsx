import {LayoutOption} from "@/components/panel/data";
import Image from "@/components/shared/image";
import cn from "classnames";
import {colorMap} from "@/data/color-settings";
import {Check} from "lucide-react";
import {usePanel} from '@/hooks/use-panel';
import React from "react";

interface layoutsProps {
    heading?: string;
    layouts: LayoutOption[];
    selectedLayout?: string;
    setSelectedLayout: (layout:string) => void;
    images: string;
}

export  function LayoutCard({heading, layouts,selectedLayout,setSelectedLayout,images }: layoutsProps) {
    const { selectedColor  } = usePanel();
    const height = React.useMemo(() => {
        if (heading === 'Footer Layout') return 45;
        return 20; // Default value
    }, [heading]);
    return (
        
        <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
            <h3 className="text-base font-medium mb-4">{heading}</h3>
            <div className="grid grid-cols-2 gap-5 gap-y-10">
            {layouts.map((layout) => (
                    <button
                        key={layout.id}
                        onClick={() => setSelectedLayout(layout?.id)}
                        className={`group relative flex flex-col items-center rounded border-1 transition-all hover:border-gray-400
                            ${
                            selectedLayout === layout.id
                                ? "border-gray-400 "
                                : "border-gray-300 "
                            }
                        `}
                    >
                        <div className="relative w-full ">
                            <Image src={images || "/placeholder.svg"} width={222} height={height} alt={layout.name}  className="object-cover" />
                            {selectedLayout === layout.id && (
                                <div className={cn(colorMap[selectedColor].bg,"absolute top-2 right-2 w-5 h-5  rounded-full flex items-center justify-center animate-in zoom-in duration-200")}>
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h4 className=" text-sm mb-1">{layout.name}</h4>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}