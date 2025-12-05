import React from "react";
import cn from "classnames";
import { Product } from "@/services/types";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import BtnRemoveWishlist from "@/components/product/productListing/productCardsUI/btn-remove-wishlist";
import {useCart} from "@/hooks/use-cart";

interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
    removeWishlist?: (id: string) => void;
}

const ProductCardBorder: React.FC<ProductProps> = ({
                                                 product,
                                                 className,
                                                 variant = "default",
                                                 removeWishlist,
                                             }) => {
    const {id, quantity } = product;
    const { useCartHelpers } = useCart();
    const {outOfStock} = useCartHelpers();
    const statusOutOfStock = outOfStock(id) || quantity < 1;
    
    return (
        <article
            className={cn(
                "flex flex-col md:gap-2 product-card px-2 md:px-3 h-full relative bg-white",
                removeWishlist && "border border-border-two rounded",
                className,
                statusOutOfStock ? "card-image--nojump" : "card-image--jump",
                {
                    "hover:drop-shadow-cardhori hover:z-50": variant === "boxBorder",
                    block: variant === "default",
                }
            )}
        >
            <BtnRemoveWishlist product={product} removeWishlist={removeWishlist} />
            <ProductImage product={product} outOfStock={statusOutOfStock}  />
            <div className="flex flex-col mb-1.5  overflow-hidden relative  items-center text-center">
                <ProductDetails product={product} />
                <ProductPricing product={product} />
                <ProductActions product={product}  />
            </div>
        </article>
    );
};

export default ProductCardBorder;