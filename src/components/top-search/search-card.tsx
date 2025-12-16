import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import { ROUTES } from '@/utils/routes';
import { searchProductPlaceholder } from '@/assets/placeholders';
import usePrice from "@/services/product/use-price";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";
import StarIcon from "@/components/icons/star-icon";

type SearchProductProps = {
  product: any;
};

const SearchCard: React.FC<SearchProductProps> = ({ product }) => {
  const { name, image, product_type, variants } = product ?? {};
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
  });

  // Calculate min/max prices from variants if not present or zero
  let calculatedMinPrice = product?.min_price;
  let calculatedMaxPrice = product?.max_price;

  if (product_type === 'variable' && variants && Array.isArray(variants) && variants.length > 0) {
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
    calculatedMinPrice = product?.price;
    calculatedMaxPrice = product?.price;
  }

  const { price: minPrice } = usePrice({
    amount: calculatedMinPrice ?? 0,
  });
  const { price: maxPrice } = usePrice({
    amount: calculatedMaxPrice ?? 0,
  });

  const { selectedColor } = usePanel();

  const rating =
    typeof product?.ratingsAverage === "number" ? product.ratingsAverage : 0;
  const reviewCount =
    typeof product?.ratingsQuantity === "number"
      ? product.ratingsQuantity
      : 0;

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${product?.slug}`}
      className="flex items-center justify-start w-full h-auto group "
    >
      <div className="relative flex w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
          src={image?.thumbnail ?? searchProductPlaceholder}
          width={70}
          height={70}
          alt={name || 'Product Image'}
          className="object-contain bg-fill-thumbnail"
        />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px mb-1.5">{name}</h3>

        {rating > 0 && (
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center gap-[2px]">
              {[...Array(5)].map((_, idx) => {
                const starValue = idx + 1;
                const isActive = starValue <= Math.round(rating);
                return (
                  <StarIcon
                    key={idx}
                    color={isActive ? "#F59E0B" : "#E5E7EB"}
                    strokeColor={isActive ? "#EA580C" : "#9CA3AF"}
                    strokeWidth={1.4}
                    className="w-3 h-3"
                  />
                );
              })}
            </div>
            <span className="text-[11px] text-gray-600">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        )}

        <div className="space-x-2">
          <span
            className={cn(
              "inline-block font-semibold text-sm sm:text-15px lg:text-base",
              colorMap[selectedColor].text
            )}
          >
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
