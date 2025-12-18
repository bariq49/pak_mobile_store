import usePrice from '@/services/product/use-price';
import isEmpty from 'lodash/isEmpty';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";
import { useProductPricing } from "@/utils/pricing";

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
    const { selectedColor } = usePanel();

  // Check if variation has deal pricing fields, otherwise use sale_price/price
  const variationOriginalPrice = selectedVariation?.originalPrice ?? null;
  const variationDealPrice = selectedVariation?.dealPrice ?? null;
  const variationPrice = selectedVariation?.price ?? null;
  const variationSalePrice = selectedVariation?.sale_price ?? null;
  
  const productPricing = useProductPricing({
    originalPrice: variationOriginalPrice,
    dealPrice: variationDealPrice,
    price: variationPrice,
    sale_price: variationSalePrice,
  });

  const price = productPricing.price;
  const basePrice = productPricing.basePrice;
  const discountPercent = productPricing.discountPercent;
  const { price: min_price } = usePrice({
    amount: minPrice,
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
  });
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-5">
      <div className={cn(colorMap[selectedColor].text,"text-brand font-medium text-xl md:text-xl xl:text-[26px]")}>
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {basePrice && (
          <>
              <del className="text-sm md:text-base xl:text-lg ltr:pl-2 rtl:pr-2 text-brand-dark/50">
                  {basePrice}
              </del>
              {typeof discountPercent === "number" && (
                <span
                    className="inline-block rounded-full text-[11px] md:text-[13px] bg-brand-sale bg-opacity-20 text-brand-light uppercase px-2 py-1 ltr:ml-1 rtl:mr-1">
                         {discountPercent}% Off
                 </span>
              )}
          </>
      )}
    </div>
  );
}
