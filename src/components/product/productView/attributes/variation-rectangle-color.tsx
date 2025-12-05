import React from "react";
import cn from "classnames";
import {VariationItem} from "@/services/types";

interface VariationRectangleColorProps {
    variationName: string;
    options: VariationItem[];
    selectedValue?: string;
    onSelect: (variationName: string, value: string) => void;
}

const VariationRectangleColor: React.FC<VariationRectangleColorProps> = ({
                                                                             variationName,
                                                                             options,
                                                                             selectedValue,
                                                                             onSelect,
                                                                         }) => (
    <div className="flex flex-wrap gap-3">
        {options.map((option) => (
            <button
                key={option.id}
                onClick={() => onSelect(variationName, option.value)}
                className={cn(
                    "flex justify-center items-center gap-2 text-brand-dark min-w-[36px] h-10 px-4 rounded text-sm border transition",
                    selectedValue === option.value
                        ? "bg-white border-gray-500 drop-shadow-variant"
                        : "bg-white border-gray-300 hover:border-gray-500"
                )}
            >
        <span
            className="block w-4 h-4 rounded-full border border-brand-dark/15"
            style={{ backgroundColor: option.value.toLowerCase() }}
        >
          <span className="sr-only">{option.value}</span>
        </span>
                <span>{option.value}</span>
            </button>
        ))}
    </div>
);

export default VariationRectangleColor;