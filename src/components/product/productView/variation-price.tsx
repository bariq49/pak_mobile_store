import usePrice from '@/services/product/use-price';
import isEmpty from 'lodash/isEmpty';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
    const { selectedColor } = usePanel();

  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? selectedVariation.sale_price
        : selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: 'USD',
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
    currencyCode: 'USD',
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
    currencyCode: 'USD',
  });
  return (
    <div className="flex items-center mt-5">
      <div className={cn(colorMap[selectedColor].text,"text-brand font-medium text-xl md:text-xl xl:text-[26px]")}>
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {discount && (
          <>
              <del className="text-sm  md:text-xl ltr:pl-3 rtl:pr-3 text-brand-dark/50">
                  {basePrice}
              </del>
              <span
                  className="inline-block rounded-full  text-[13px]  bg-brand-sale bg-opacity-20 text-brand-light uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                       {discount} Off
               </span>
          </>
      )}
    </div>
  );
}
