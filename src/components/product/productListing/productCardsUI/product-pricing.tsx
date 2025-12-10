import React from "react";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface ProductPricingProps {
  product: Product;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ product }) => {
  const { product_type, sale_price, price, min_price, max_price } = product;
  const { selectedColor } = usePanel();

  const { price: displayPrice, basePrice } = usePrice({
    amount: sale_price ? sale_price : price,
    baseAmount: price,
  });

  const { price: minPrice } = usePrice({
    amount: min_price ?? 0,
  });

  const { price: maxPrice } = usePrice({
    amount: max_price ?? 0,
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
