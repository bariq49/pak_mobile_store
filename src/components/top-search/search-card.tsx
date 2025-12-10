import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import { ROUTES } from '@/utils/routes';
import { searchProductPlaceholder } from '@/assets/placeholders';
import usePrice from "@/services/product/use-price";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

type SearchProductProps = {
  product: any;
};

const SearchCard: React.FC<SearchProductProps> = ({ product }) => {
  const { name, image, product_type } = product ?? {};
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
  });
  
  const { selectedColor } = usePanel();

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
          className="object-cover bg-fill-thumbnail"
        />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px  mb-1.5">{name}</h3>
        <div className="space-x-2 ">
          <span className={cn("inline-block font-semibold text-sm sm:text-15px lg:text-base ",colorMap[selectedColor].text)}>
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
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
