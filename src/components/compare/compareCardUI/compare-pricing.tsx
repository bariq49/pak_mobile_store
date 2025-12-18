import React from "react";
import cn from "classnames";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import {usePanel} from '@/hooks/use-panel';
import { colorMap } from "@/data/color-settings";
import { useProductPricing } from "@/utils/pricing";

interface ComparePricingProps {
    product: Product;
}

const ComparePricing: React.FC<ComparePricingProps> = ({ product }) => {
    const { product_type, originalPrice, dealPrice, sale_price, price, min_price, max_price } = product;
    const { selectedColor } = usePanel();
    
    const productPricing = useProductPricing({
      originalPrice: originalPrice ?? null,
      dealPrice: dealPrice ?? null,
      price: price ?? null,
      sale_price: sale_price ?? null,
    });
    
    const displayPrice = productPricing.price;
    const basePrice = productPricing.basePrice;
    const { price: minPrice } = usePrice({
      amount: min_price ?? 0,
    });
    const { price: maxPrice } = usePrice({
      amount: max_price ?? 0,
    });

    return (
        <div className="w-full flex flex-wrap items-center gap-1.5">
          <span
              className={cn(colorMap[selectedColor].text, "inline-block font-semibold text-base")}
          >
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : displayPrice}
          </span>
            {basePrice && (
                <del className="text-sm text-gray-400 text-opacity-70">{basePrice}</del>
            )}
        </div>
    );
};

export default ComparePricing;