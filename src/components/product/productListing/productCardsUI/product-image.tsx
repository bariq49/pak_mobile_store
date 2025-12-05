import React, {useMemo} from "react";
import cn from "classnames";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import SearchIcon from "@/components/icons/search-icon";
import {useModal} from "@/hooks/use-modal";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import usePrice from "@/services/product/use-price";

interface ProductImageProps {
    product: Product;
    outOfStock: boolean;
    variant?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, outOfStock,variant="default" }) => {
    const { image, name, sale_price, price } = product;
    const { openModal } = useModal();
    const { selectedColor } = usePanel();
    const { discount } = usePrice({
        amount: sale_price ? sale_price : price,
        baseAmount: price,
        currencyCode: "USD",
    });
    
    const handlePopupView = () => {
        openModal("PRODUCT_VIEW", product);
    };
    
    const imgSize = useMemo(() => {
        switch (variant) {
            case 'list':
                return 280;
            case 'bestdeal':
            case 'furni':
                return 300;
            default:
                return 200;
        }
    }, [variant]);
    
    return (
        <div className={cn("relative flex-shrink-0  z-1",
            variant === "default" && "mt-3"
            )}>
            
            <div className={cn("flex justify-center card-img-container overflow-hidden w-full",
                variant === "list" && "rounded-md border border-black/10"
                )
            }>
                <Image
                    src={image?.thumbnail ?? productPlaceholder}
                    alt={name || "Product Image"}
                    width={imgSize}
                    height={imgSize}
                />
            </div>
            <div className="w-full h-full absolute top-1 z-10">
                {discount && (
                    <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-red-600 rounded-sm px-2.5 pt-1 pb-[3px] mx-1">
                    On Sale
                    </span>
                )}
                
                {outOfStock ? (
                    <span className="text-[10px] font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-2.5 pt-1 pb-[3px] mx-1">
                    Out Stock
                  </span>
                ) : (
                    <button
                        className={cn(
                            colorMap[selectedColor].hoverBg,
                            "buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:text-brand-light"
                        )}
                        aria-label="Quick View Button"
                        onClick={handlePopupView}
                    >
                        <SearchIcon/>
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default ProductImage;