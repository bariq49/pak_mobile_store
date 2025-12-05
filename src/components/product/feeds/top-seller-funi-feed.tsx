'use client';

import type { FC } from 'react';
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { LIMITS } from '@/services/utils/limits';
import {useTopSellProductsQuery} from "@/services/product/get-all-topsell-produts";

interface ProductFeedProps {
  className?: string;
  variant?: string;
  rowCarousel?: number;
}

const TopSellerFuniFeed: FC<ProductFeedProps> = ({
  className,
  variant,
  rowCarousel
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading } = useTopSellProductsQuery({
    limit: limit,
  });
  return (
    <ProductsCarousel
      sectionHeading={"Top Selling Products"}
      className={className}
      products={data}
      loading={isLoading}
      limit={limit}
      uniqueKey="top-seller"
      rowCarousel={rowCarousel}
      variant={variant}
    />
  );
};

export default TopSellerFuniFeed;
