import React from "react";
import { Product, VariationOption } from "@/services/types";
import isEmpty from "lodash/isEmpty";
import VariationPrice from "@/components/product/productView/variation-price";
import usePrice from "@/services/product/use-price";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

interface ProductPricingProps {
    data: Product;
    selectedVariation?: VariationOption;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ data, selectedVariation }) => {
    const { price, basePrice, discount } = usePrice({
        amount: data.sale_price ? data.sale_price : data.price,
        baseAmount: data.price,
        currencyCode: "USD",
    });
    const { selectedColor } = usePanel();
    const variations = data.variations;

    return (
        <div className={"pb-3 lg:pb-5"}>
            {isEmpty(variations) ? (
                <div className="flex items-center mt-5">
                    <div
                        className={cn(
                            colorMap[selectedColor].text,
                            "font-medium text-base md:text-xl xl:text-2xl"
                        )}
                    >
                        {price}
                    </div>
                    {discount && (
                        <>
                            <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-muted">
                                {basePrice}
                            </del>
                            <span className="inline-block rounded font-medium text-xs md:text-sm bg-brand-sale text-brand-light uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                                {discount} off
                            </span>
                        </>
                    )}
                </div>
            ) : (
                <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
                />
            )}
        </div>
    );
};

export default ProductPricing;