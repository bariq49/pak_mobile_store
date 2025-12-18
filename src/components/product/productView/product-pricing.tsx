import React from "react";
import { Product, VariationOption } from "@/services/types";
import VariationPrice from "@/components/product/productView/variation-price";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";
import usePrice from "@/services/product/use-price";
import { useProductPricing } from "@/utils/pricing";

interface ProductPricingProps {
  data: Product;
  selectedVariation?: VariationOption;
}

const ProductPricing: React.FC<ProductPricingProps> = ({
  data,
  selectedVariation,
}) => {
  const { selectedColor } = usePanel();

  const hasVariants =
    data.variants && Array.isArray(data.variants) && data.variants.length > 0;
  const hasVariations =
    data.variations && Array.isArray(data.variations) && data.variations.length > 0;
  const hasAnyVariants = hasVariants || hasVariations;

  const productPricing = useProductPricing({
    originalPrice: data.originalPrice ?? null,
    dealPrice: data.dealPrice ?? null,
    price: data.price ?? null,
    sale_price: data.sale_price ?? data.salePrice ?? null,
  });

  // Calculate min/max prices from variants if not present on product
  let minPrice = data.min_price;
  let maxPrice = data.max_price;

  if (
    hasVariants &&
    (!minPrice || !maxPrice || minPrice === 0 || maxPrice === 0)
  ) {
    const variantPrices = data.variants
      .map((variant: any) => variant.price)
      .filter(
        (price: number | undefined): price is number =>
          typeof price === "number" && price > 0
      );

    if (variantPrices.length > 0) {
      minPrice = minPrice || Math.min(...variantPrices);
      maxPrice = maxPrice || Math.max(...variantPrices);
    }
  }

  // Fallback to product price if no variants or variant prices
  if (
    (!minPrice || minPrice === 0) &&
    (!maxPrice || maxPrice === 0) &&
    !hasAnyVariants
  ) {
    minPrice = data.price;
    maxPrice = data.price;
  }

  const { price: minRangePrice } = usePrice({
    amount: minPrice ?? 0,
  });

  const { price: maxRangePrice } = usePrice({
    amount: maxPrice ?? 0,
  });

  return (
    <div className={"pb-3 lg:pb-5"}>
      {!hasAnyVariants ? (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-5">
          <div
            className={cn(
              colorMap[selectedColor].text,
              "font-medium text-base md:text-xl xl:text-2xl"
            )}
          >
            {productPricing.price}
          </div>
          {productPricing.basePrice && (
            <>
              <del className="text-sm md:text-base xl:text-lg text-opacity-50 text-brand-muted">
                {productPricing.basePrice}
              </del>
              {typeof productPricing.discountPercent === "number" && (
                <span className="inline-block rounded font-medium text-xs md:text-sm bg-brand-sale text-brand-light uppercase px-2 py-1">
                  {productPricing.discountPercent}% off
                </span>
              )}
            </>
          )}
        </div>
      ) : (
        <VariationPrice
          selectedVariation={selectedVariation}
          minPrice={minRangePrice}
          maxPrice={maxRangePrice}
        />
      )}
    </div>
  );
};

export default ProductPricing;
