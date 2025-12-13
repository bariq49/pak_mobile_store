import React from "react";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface ProductPricingProps {
  product: Product;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ product }) => {
  const { product_type, sale_price, price, min_price, max_price, variants } = product;
  const { selectedColor } = usePanel();

  const { price: displayPrice, basePrice } = usePrice({
    amount: sale_price ? sale_price : price,
    baseAmount: price,
  });

  // Calculate min/max prices from variants if not present or zero
  let calculatedMinPrice = min_price;
  let calculatedMaxPrice = max_price;

  if (product_type === "variable" && variants && Array.isArray(variants) && variants.length > 0) {
    if (!calculatedMinPrice || calculatedMinPrice === 0 || !calculatedMaxPrice || calculatedMaxPrice === 0) {
      const variantPrices = variants
        .map((variant: any) => variant.price)
        .filter((price: number | undefined): price is number => typeof price === 'number' && price > 0);
      
      if (variantPrices.length > 0) {
        calculatedMinPrice = calculatedMinPrice || Math.min(...variantPrices);
        calculatedMaxPrice = calculatedMaxPrice || Math.max(...variantPrices);
      }
    }
  }

  // Fallback to product price if still no valid prices
  if ((!calculatedMinPrice || calculatedMinPrice === 0) && (!calculatedMaxPrice || calculatedMaxPrice === 0)) {
    calculatedMinPrice = price;
    calculatedMaxPrice = price;
  }

  const { price: minPrice } = usePrice({
    amount: calculatedMinPrice ?? 0,
  });

  const { price: maxPrice } = usePrice({
    amount: calculatedMaxPrice ?? 0,
  });

  return (
    <div className="space-s-2 mt-2 mb-4">
      <span
        className={`${colorMap[selectedColor].text} inline-block font-medium`}
      >
        {product_type === "variable"
          ? `${minPrice} - ${maxPrice}`
          : displayPrice}
      </span>
      {basePrice && (
        <del className="mx-1 text-gray-400 text-opacity-70">{basePrice}</del>
      )}
    </div>
  );
};

export default ProductPricing;
