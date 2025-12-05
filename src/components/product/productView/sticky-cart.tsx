import React, { useEffect } from 'react';
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import { usePanel } from "@/hooks/use-panel";
import { ROUTES } from "@/utils/routes";
import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import Container from "@/components/shared/container";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import Button from "@/components/shared/button";

interface Props {
    product?: Product;
    addToCartLoader: boolean;
    handleAddToCart: () => void;
    targetButtonRef: React.RefObject<HTMLButtonElement | null>;
    isCartVisible: boolean;
    setCartVisible: (visible: boolean) => void;
    isSelected: boolean;
}

const StickyCart: React.FC<Props> = ({ product, addToCartLoader, handleAddToCart, targetButtonRef, isCartVisible, setCartVisible, isSelected }) => {
    const { price, basePrice } = usePrice({
        amount: product?.sale_price ?? product?.price ?? 0,
        baseAmount: product?.price ?? undefined,
        currencyCode: 'USD'
    });
    const { price: minPrice } = usePrice({
        amount: product?.min_price ?? 0,
        currencyCode: 'USD',
    });
    const { price: maxPrice } = usePrice({
        amount: product?.max_price ?? 0,
        currencyCode: 'USD',
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

                        <Button
                            variant="dark"
                            onClick={renderAddtocart}
                            className="xs:h-11 xs:text-sm xs:py-3 md:ms-auto"
                            loading={addToCartLoader}
                        >
                            Add To Cart
                        </Button>
                    </div>
                
                </div>
            </Container>
        </div>
    ) : null;
};

export default StickyCart;
