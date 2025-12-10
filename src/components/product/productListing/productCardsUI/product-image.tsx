import React from "react";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import SearchIcon from "@/components/icons/search-icon";
import { useModal } from "@/hooks/use-modal";
import usePrice from "@/services/product/use-price";

interface ProductImageProps {
  product: Product;
  outOfStock: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, outOfStock }) => {
  const { image, name, sale_price, price } = product;
  const { openModal } = useModal();
  const { discount } = usePrice({
    amount: sale_price ? sale_price : price,
    baseAmount: price,
  });

  const handlePopupView = () => {
    openModal("PRODUCT_VIEW", product);
  };

  return (
    <div className="relative flex-shrink-0 z-1 mt-3">
      <div className="flex justify-center card-img-container overflow-hidden w-full">
        <Image
          src={image?.thumbnail ?? productPlaceholder}
          alt={name || "Product Image"}
          width={200}
          height={200}
        />
      </div>

      <div className="w-full h-full absolute top-1 z-10">
        {discount && (
          <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-label_out rounded-sm px-2.5 pt-1 pb-[3px] -mx-1">
            On Sale
          </span>
        )}

        {outOfStock ? (
          <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-2.5 pt-1 pb-[3px] mx-1">
            Out Stock
          </span>
        ) : (
          <button
            className="buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:text-brand-light hover:bg-primary-500"
            aria-label="Quick View Button"
            onClick={handlePopupView}
          >
            <SearchIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
