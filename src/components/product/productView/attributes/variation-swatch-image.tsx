import React from "react";
import cn from "classnames";
import { Tooltip } from "@/components/shared/tooltip";
import { VariationItem} from "@/services/types";
import Image from "@/components/shared/image";
import { productPlaceholder } from "@/assets/placeholders";

interface VariationSwatchImageProps {
    variationName: string;
    options: VariationItem[];
    selectedValue?: string;
    onSelect: (variationName: string, value: string) => void;
}

const VariationSwatchImage: React.FC<VariationSwatchImageProps> = ({
                                                                       variationName,
                                                                       options,
                                                                       selectedValue,
                                                                       onSelect,
                                                                   }) => (
    <div className="flex flex-wrap gap-3">
        {options.map((option) => (
            <Tooltip
                content={option.value}
                key={option.id}
                rootclassName={cn(
                    "p-0",
                    selectedValue === option.value ? "drop-shadow-variant" : ""
                )}
            >
                <div
                    className={cn(
                        "relative cursor-pointer w-12 h-12 border overflow-hidden rounded-full",
                        selectedValue === option.value
                            ? "border-brand-dark"
                            : "border-brand-dark/10 hover:border-brand-dark"
                    )}
                    onClick={() => onSelect(variationName, option.value)}
                >
                    <Image
                        src={option.image ?? productPlaceholder}
                        width={130}
                        height={130}
                        alt={option.value || "Product Image"}
                    />
                    <span className="sr-only">{option.value}</span>
                </div>
            </Tooltip>
        ))}
    </div>
);

export default VariationSwatchImage;