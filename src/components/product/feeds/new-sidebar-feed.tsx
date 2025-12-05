'use client';
import type { FC } from 'react';

import { LIMITS } from '@/services/utils/limits';
import ProductsCarouselVertical from "@/components/product/feeds/products-carousel-vertical";
import {useThisWeekProductsQuery} from "@/services/product/get-all-this-week-products";

interface ProductFeedProps {
    className?: string;
    variant?: string;
}

const NewSidebarFeed: FC<ProductFeedProps> = ({
                                                         className="mb-8 lg:mb-10",
                                                         variant,
                                                     }) => {
    const { data: Product=[], isLoading } = useThisWeekProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });
    
    return (
      <ProductsCarouselVertical
        sectionHeading="New Arrival"
        products={Product}
        loading={isLoading}
        limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
        uniqueKey="new-arrival-vertical"
        className={className}
        variant={variant}
        rowCarousel={3}
      />
    );
};
export default NewSidebarFeed;
