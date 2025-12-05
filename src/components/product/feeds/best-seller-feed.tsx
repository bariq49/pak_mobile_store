"use client";
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import {useBestSellerProductsQuery} from '@/services/product/get-all-best-seller-products';
import {LIMITS} from '@/services/utils/limits';
import {FC, useMemo} from "react";

interface Props {
    className?: string;
    variant?: string;
    rowCarousel?: number;
    uniqueKey?: string;
}


const BestSellerFeed: FC<Props> = ({
                                       className = 'mb-8 md:mb-10',
                                       variant = 'default',
                                       rowCarousel,
                                       uniqueKey = "best-sellers"
                                   }) => {
    
    const {data: Product = [], isLoading} = useBestSellerProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });
    
    // Memoize sectionHeading based on uniqueKey
    const sectionHeading = useMemo(() => {
        if (uniqueKey === 'best-sellers4') {
            return 'Best Sellers <span class="font-light">Product</span>';
        }
        return 'Best sellers';
    }, [uniqueKey]);
    
    return (
        <ProductsCarousel
            sectionHeading={sectionHeading}
            products={Product}
            loading={isLoading}
            limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
            uniqueKey={uniqueKey}
            rowCarousel={rowCarousel}
            variant={variant}
            className={className}
        
        />
    );
}
export default BestSellerFeed;
