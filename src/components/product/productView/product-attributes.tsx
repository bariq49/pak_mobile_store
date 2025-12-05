import React from "react";
import cn from "classnames";
import { VariationsType } from "@/services/types";
import VariationSwatch from "@/components/product/productView/attributes/variation-swatch";
import VariationSwatchImage from "@/components/product/productView/attributes/variation-swatch-image";
import VariationRectangle from "@/components/product/productView/attributes/variation-rectangle";
import VariationRectangleColor from "@/components/product/productView/attributes/variation-rectangle-color";
import VariationRadio from "@/components/product/productView/attributes/variation-radio";
import VariationDropdown from "@/components/product/productView/attributes/variation-dropdown";
import VariationError from "@/components/product/productView/attributes/variation-error";
import useProductAttributes from "@/hooks/use-product-attributes";

interface Props {
    className?: string;
    variations: VariationsType;
    attributes: { [key: string]: string };
    setAttributes: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    error?: boolean;
}

const ProductAttributes: React.FC<Props> = ({
                                                className = "mb-5 lg:mb-7",
                                                variations,
                                                attributes,
                                                setAttributes,
                                                error,
                                            }) => {
    useProductAttributes(variations, setAttributes);

    if (!variations) return null;

    const handleSelect = (variationName: string, value: string) => {
        setAttributes((prev) => ({
            ...prev,
            [variationName]: value,
        }));
    };

    return (
        <>
            {Object.entries(variations).map(([variationName, variation], index) => (
                <div className={cn(className)} key={index}>
                    <h4 className="mb-3 capitalize text-sm text-brand-dark">
                        {variationName.split("-").join(" ")}
                        <span className="font-medium">
                          {attributes[variationName] ? `: ${attributes[variationName]}` : ":"}
                        </span>
                    </h4>
                    {variation.type === "swatch" && (
                        <VariationSwatch
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {variation.type === "swatchImage" && (
                        <VariationSwatchImage
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {variation.type === "rectangle" && (
                        <VariationRectangle
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {variation.type === "rectangleColor" && (
                        <VariationRectangleColor
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {variation.type === "radio" && (
                        <VariationRadio
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {variation.type === "dropdown" && (
                        <VariationDropdown
                            variationName={variationName}
                            options={variation.options}
                            selectedValue={attributes[variationName]}
                            onSelect={handleSelect}
                        />
                    )}
                    {error && (
                        <VariationError variationName={variationName} />
                    )}
                </div>
            ))}
        </>
    );
};

export default ProductAttributes;