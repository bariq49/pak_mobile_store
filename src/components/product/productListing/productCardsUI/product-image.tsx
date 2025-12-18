import React from "react";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import SearchIcon from "@/components/icons/search-icon";
import { useModal } from "@/hooks/use-modal";
import { useProductPricing } from "@/utils/pricing";

interface ProductImageProps {
  product: Product;
  outOfStock: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, outOfStock }) => {
  const { image, name, originalPrice, dealPrice, sale_price, price } = product;
  const { openModal } = useModal();
  
  const productPricing = useProductPricing({
    originalPrice: originalPrice ?? null,
    dealPrice: dealPrice ?? null,
    price: price ?? null,
    sale_price: sale_price ?? null,
  });
  
  // Show different badges for deal vs sale, but prioritize Out of Stock
  const hasDeal = productPricing.hasDeal && !outOfStock;
  const hasSale = productPricing.hasSale && !hasDeal && !outOfStock;

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
          className="!object-contain"
        />
      </div>

      <div className="w-full h-full absolute top-1 z-10">
        {/* Out of Stock badge takes priority - show it and hide all other badges */}
        {outOfStock ? (
          <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-2.5 pt-1 pb-[3px] mx-1">
            Out of Stock
          </span>
        ) : (
          <>
            {hasDeal && (
              <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-label_out rounded-sm px-2.5 pt-1 pb-[3px] -mx-1">
                Deal
              </span>
            )}
            {hasSale && (
              <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-label_out rounded-sm px-2.5 pt-1 pb-[3px] -mx-1">
                On Sale
              </span>
            )}
            <button
              className="buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:text-brand-light hover:bg-primary-500"
              aria-label="Quick View Button"
              onClick={handlePopupView}
            >
              <SearchIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
