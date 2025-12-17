import React from "react";
import { Product } from "@/services/types";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import { useDealAwarePrice } from "@/utils/pricing";
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

  const dealPricing = useDealAwarePrice({
    originalPrice:
      typeof originalPrice === "number" && originalPrice > 0
        ? originalPrice
        : sale_price ?? price,
    dealPrice: dealPrice ?? null,
  });

  const unitPrice = dealPricing.price;
  const unitBasePrice = dealPricing.basePrice;

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
    <div className="space-s-2 mt-2 mb-4">
      <span
        className={`${colorMap[selectedColor].text} inline-block font-medium`}
      >
        {product_type === "variable"
          ? `${minPrice} - ${maxPrice}`
          : unitPrice}
      </span>
      {unitBasePrice && (
        <del className="mx-1 text-gray-400 text-opacity-70">
          {unitBasePrice}
        </del>
      )}
    </div>
  );
};

export default ProductPricing;
