import React from "react";
import { VariationItem } from "@/services/types";

interface VariationDropdownProps {
    variationName: string;
    options: VariationItem[];
    selectedValue?: string;
    onSelect: (variationName: string, value: string) => void;
}

const VariationDropdown: React.FC<VariationDropdownProps> = ({
                                                                 variationName,
                                                                 options,
                                                                 selectedValue,
                                                                 onSelect,
                                                             }) => (
    <select
        className="border border-gray-300 rounded p-2 text-sm min-w-[250px] ring-0 focus:border-brand-dark"
        value={selectedValue || ""}
        onChange={(e) => onSelect(variationName, e.target.value)}
    >
        {options.map((attribute) => (
            <option key={attribute.id} value={attribute.value}>
                {attribute.value}
            </option>
        ))}
    </select>
);

export default VariationDropdown;