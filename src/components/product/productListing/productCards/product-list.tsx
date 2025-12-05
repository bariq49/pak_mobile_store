import cn from 'classnames';
import {Product} from '@/services/types';

import React from "react";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import {useCart} from "@/hooks/use-cart";


interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
}

const ProductCardList: React.FC<ProductProps> = ({product, className,variant = "list",}) => {
    const { id,description,quantity} = product ?? {};
    const { useCartHelpers } = useCart();
    const {outOfStock} = useCartHelpers();
    const statusOutOfStock = outOfStock(id) || quantity < 1;
    return (
        <article
            className={cn(
                'product-list-view  overflow-hidden relative  grid grid-cols-4  p-2 lg:p-4 lg:py-3 gap-4 lg:gap-8 bg-white rounded ',
                className
            )}
        >
            <div className="col-span-1 relative">
                <ProductImage product={product} outOfStock={statusOutOfStock} variant={variant} />
            </div>
            
            <div className="col-span-3">
                <ProductDetails product={product} variant={variant}/>
               
                <ProductPricing product={product} variant={variant} />
                
                <p className="hidden lg:block text-sm text-skin-base line-clamp-3 leading-7 opacity-80">
                    {description}
                </p>
                
                <div className="inline-block   lg:mt-6">
                    <ProductActions product={product}  />
                </div>
            </div>
           
        </article>
    );
};

export default ProductCardList;
