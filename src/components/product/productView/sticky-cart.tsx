import React, { useEffect } from 'react';
import usePrice from "@/services/product/use-price";
import { Product, VariationOption } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import { usePanel } from "@/hooks/use-panel";
import { ROUTES } from "@/utils/routes";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import Container from "@/components/shared/container";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import Button from "@/components/shared/button";
import { useBuyNow } from "@/hooks/use-buy-now";
import { useUI } from "@/hooks/use-UI";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface Props {
    product?: Product;
    addToCartLoader: boolean;
    handleAddToCart: () => void;
    targetButtonRef: React.RefObject<HTMLButtonElement | null>;
    isCartVisible: boolean;
    setCartVisible: (visible: boolean) => void;
    isSelected: boolean;
    selectedVariation?: VariationOption;
}

const StickyCart: React.FC<Props> = ({ product, addToCartLoader, handleAddToCart, targetButtonRef, isCartVisible, setCartVisible, isSelected, selectedVariation }) => {
    const { useBuyNowActions } = useBuyNow();
    const { buyNow, buyNowLoader } = useBuyNowActions(product, selectedVariation);
    const { isAuthorized } = useUI();
    const { openModal } = useModal();
    const { price, basePrice } = usePrice({
      amount: product?.sale_price ?? product?.price ?? 0,
      baseAmount: product?.price ?? undefined,
    });

    // Calculate min/max prices from variants if not present or zero
    let calculatedMinPrice = product?.min_price;
    let calculatedMaxPrice = product?.max_price;

    if (product?.product_type === 'variable' && product?.variants && Array.isArray(product.variants) && product.variants.length > 0) {
      if (!calculatedMinPrice || calculatedMinPrice === 0 || !calculatedMaxPrice || calculatedMaxPrice === 0) {
        const variantPrices = product.variants
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
    
    const checkScrollPosition = () => {
        if (targetButtonRef.current) {
            const Height = 50;
            const rectShowCart = targetButtonRef.current.getBoundingClientRect();
            
            if (rectShowCart.top - Height >= 0) {
                setCartVisible(false);
            } else {
                setCartVisible(true);
            }
        }
    };
    
    const renderAddtocart = ()=> {
        !isSelected && window.scrollTo({ top: 100, behavior: 'smooth' });
        handleAddToCart();
    }

    const handleBuyNow = () => {
        if (!isAuthorized) {
            openModal("LOGIN_VIEW");
            toast.error("Please login to buy now");
            return;
        }
        if (!isSelected) {
            toast.error("Please select product options");
            return;
        }
        buyNow();
    };
    
    useEffect(() => {
        window.addEventListener('scroll', checkScrollPosition);
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, [checkScrollPosition]);
    
    return product && isCartVisible ? (
        <div className="w-full z-40 bg-white/80 backdrop-blur-md fixed  left-0 bottom-0 border-t border-border-base py-2 drop-shadow-header">
            <Container>
                <div className="flex  gap-2 md:gap-5 items-center">
                    <div className="relative card-img-container overflow-hidden">
                        <Image src={product.image?.thumbnail ?? productPlaceholder} width={60} height={60}
                               alt={product.name || 'Product Image'} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-5 md:items-center w-full">
                        <div>
                            <Link
                                href={`${ROUTES.PRODUCT}/${product.slug}`}
                                className="text-brand-dark  text-sm leading-5 block mt-1"
                            >
                                {product.name}
                            </Link>
                            <div className="space-s-2 mt-1">
                            <span
                                className={cn(colorMap[selectedColor].text, "inline-block font-medium")}>
                                {product.product_type === 'variable'
                                    ? `${minPrice} - ${maxPrice}`
                                    : price}
                            </span>
                                {basePrice && (
                                    <del className="mx-1 text-gray-400 text-opacity-70">
                                        {basePrice}
                                    </del>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 md:ms-auto">
                            <Button
                                variant="dark"
                                onClick={renderAddtocart}
                                className="xs:h-11 xs:text-sm xs:py-3"
                                loading={addToCartLoader}
                            >
                                Add To Cart
                            </Button>
                            <button
                                className="xs:h-11 xs:text-sm xs:py-3 h-12 bg-white hover:bg-gray-50 text-brand-dark tracking-widest rounded-md font-medium text-15px leading-4 inline-flex items-center transition ease-in-out duration-300 font-body text-center justify-center px-5 md:px-6 lg:px-8 border border-border-base shadow-sm hover:shadow-md disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300"
                                onClick={handleBuyNow}
                                disabled={!isSelected || addToCartLoader || buyNowLoader}
                                aria-label="Buy Now Button"
                            >
                                {buyNowLoader ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    "Buy Now"
                                )}
                            </button>
                        </div>
                    </div>
                
                </div>
            </Container>
        </div>
    ) : null;
};

export default StickyCart;
