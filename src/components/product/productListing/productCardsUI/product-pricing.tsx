import React from "react";
import { Product } from "@/services/types";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import { useProductPricing } from "@/utils/pricing";
import usePrice from "@/services/product/use-price";

interface ProductPricingProps {
  product: Product;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ product }) => {
  const {
    product_type,
    sale_price,
    price,
    min_price,
    max_price,
    variants,
    originalPrice,
    dealPrice,
  } = product;
  const { selectedColor } = usePanel();

  const productPricing = useProductPricing({
    originalPrice: originalPrice ?? null,
    dealPrice: dealPrice ?? null,
    price: price ?? null,
    sale_price: sale_price ?? null,
  });

  const unitPrice = productPricing.price;
  const unitBasePrice = productPricing.basePrice;

  // Calculate min/max prices from variants if not present or zero
  let calculatedMinPrice = min_price;
  let calculatedMaxPrice = max_price;

  if (
    product_type === "variable" &&
    variants &&
    Array.isArray(variants) &&
    variants.length > 0
  ) {
    if (
      !calculatedMinPrice ||
      calculatedMinPrice === 0 ||
      !calculatedMaxPrice ||
      calculatedMaxPrice === 0
    ) {
      const variantPrices = variants
        .map((variant: any) => variant.price)
        .filter(
          (p: number | undefined): p is number =>
            typeof p === "number" && p > 0
        );

      if (variantPrices.length > 0) {
        calculatedMinPrice = calculatedMinPrice || Math.min(...variantPrices);
        calculatedMaxPrice = calculatedMaxPrice || Math.max(...variantPrices);
      }
    }
  }

  // Fallback to product price if still no valid prices
  if (
    (!calculatedMinPrice || calculatedMinPrice === 0) &&
    (!calculatedMaxPrice || calculatedMaxPrice === 0)
  ) {
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
    <div className="flex flex-wrap items-center gap-1.5 mt-2 mb-4">
      <span
        className={`${colorMap[selectedColor].text} inline-block font-medium text-sm sm:text-base`}
      >
        {product_type === "variable"
          ? `${minPrice} - ${maxPrice}`
          : unitPrice}
      </span>
      {unitBasePrice && (
        <del className="text-xs sm:text-sm text-gray-400 text-opacity-70">
          {unitBasePrice}
        </del>
      )}
    </div>
  );
};

export default ProductPricing;
