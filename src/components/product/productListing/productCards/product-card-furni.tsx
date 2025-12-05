import cn from 'classnames';
import {Product} from '@/services/types';
import React from "react";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import {useCart} from "@/hooks/use-cart";


interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
}


const ProductCardFurni: React.FC<ProductProps> = ({product, className, variant="furni"}) => {
    const {id, quantity} = product ?? {};

    // Use new hooks
    const { useCartHelpers } = useCart();
    const {outOfStock} = useCartHelpers();
    const statusOutOfStock = outOfStock(id) || quantity < 1;
  
    return (
        <article
            className={cn(
                'flex flex-col md:gap-2 product-card  h-full relative ',
                className,
                Number(quantity) < 1 || statusOutOfStock ? 'card-image--nojump' : 'card-image--jump ', {
                    'block': variant === 'default',
                }
            )}
        >
            
            <div className="relative flex-shrink-0 overflow-hidden">
                <ProductImage product={product} outOfStock={statusOutOfStock}  variant={variant}  />
                <ProductActions product={product} variant={variant} />
            </div>
            
            <div className="overflow-hidden relative ">
                <ProductDetails product={product} variant={variant} />
                <ProductPricing product={product} variant={variant}/>
            </div>
        </article>
    );
};

export default ProductCardFurni;
