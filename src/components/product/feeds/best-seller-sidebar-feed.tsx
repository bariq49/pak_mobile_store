'use client';
import type { FC } from 'react';

import { LIMITS } from '@/services/utils/limits';
import ProductsCarouselVertical from "@/components/product/feeds/products-carousel-vertical";
import {useBestSellerProductsQuery} from "@/services/product/get-all-best-seller-products";

interface ProductFeedProps {
    className?: string;
    variant?: string;
}

const BestSidebarFeed: FC<ProductFeedProps> = ({
                                                         className="mb-8 lg:mb-10",
                                                         variant,
                                                     }) => {
    const { data: Product=[], isLoading } = useBestSellerProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });
    
    return (
      <ProductsCarouselVertical
        sectionHeading="Best Seller"
        products={Product}
        loading={isLoading}
        limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
        uniqueKey="best-sellers-vertical"
        className={className}
        variant={variant}
        rowCarousel={3}
      />
    );
};
export default BestSidebarFeed;
