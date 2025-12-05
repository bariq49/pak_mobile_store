'use client';
import type { FC } from 'react';

import { LIMITS } from '@/services/utils/limits';
import {useRelatedProductsQuery} from "@/services/product/get-related-product";
import ProductsCarousel from "@/components/product/feeds/products-carousel";

interface ProductFeedProps {
  variant?: string;
  className?: string;
  uniqueKey?: string;
}

const NewProductFeed: FC<ProductFeedProps> = ({variant, className,uniqueKey="new-arrival" }) => {
  const limit = LIMITS.NEW_ARRIVAL_PRODUCTS_LIMITS;
  const { data, isLoading } = useRelatedProductsQuery({
    limit: limit,
  });
  return (
      <ProductsCarousel
      sectionHeading={"New Arrival <span class=\"font-light\"> Product</span>"}
      className={className}
      products={data ?? []}
      loading={isLoading}
      limit={limit}
      uniqueKey={uniqueKey}
      variant={variant}
    />
  );
};
export default NewProductFeed;
