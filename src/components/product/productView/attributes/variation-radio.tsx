import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/shared/radio-group";
import { VariationItem } from "@/services/types";

interface VariationRadioProps {
    variationName: string;
    options: VariationItem[];
    selectedValue?: string;
    onSelect: (variationName: string, value: string) => void;
}

const VariationRadio: React.FC<VariationRadioProps> = ({
                                                           variationName,
                                                           options,
                                                           selectedValue,
                                                           onSelect,
                                                       }) => (
    <div className="flex flex-col space-y-2">
        <RadioGroup
            value={selectedValue || ""}
            onValueChange={(value) => onSelect(variationName, value)}
            className="flex flex-col gap-3"
        >
            {options.map((attribute) => (
                <label
                    key={attribute.id}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <RadioGroupItem value={attribute.value} />
                    <span className="flex justify-between leading-5 text-sm text-brand-dark">
            {attribute.value}
          </span>
                </label>
            ))}
        </RadioGroup>
    </div>
);

export default VariationRadio;