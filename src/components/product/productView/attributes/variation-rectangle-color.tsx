import React from "react";
import cn from "classnames";
import { VariationItem } from "@/services/types";

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
    {options.map((option, index) => {
      const isSelected = selectedValue === option.value;
      const color = option.value.toLowerCase();

      return (
        <button
          key={index}
          onClick={() => onSelect(variationName, option.value)}
          className={cn(
            "flex justify-center items-center gap-2 text-sm min-w-[36px] h-10 px-4 rounded border transition",
            "bg-white dark:bg-transparent",
            !isSelected && "hover:border-gray-500"
          )}
          style={{
            borderColor: isSelected ? color : undefined,
            boxShadow: isSelected ? `0 1px 4px ${color}` : "none",
          }}
        >
          <span
            className="block w-4 h-4 rounded-full border border-brand-dark/15"
            style={{ backgroundColor: color }}
          >
            <span className="sr-only">{option.value}</span>
          </span>
          <span className="capitalize">{option.value}</span>
        </button>
      );
    })}
  </div>
);

export default VariationRectangleColor;
