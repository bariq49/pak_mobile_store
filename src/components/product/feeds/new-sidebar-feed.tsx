"use client";
import type { FC } from "react";

import { LIMITS } from "@/services/utils/limits";
import ProductsCarouselVertical from "@/components/product/feeds/products-carousel-vertical";
import { useNewSellerProductsQuery } from "@/services/product/get-all-new-seller-products";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const NewSidebarFeed: FC<ProductFeedProps> = ({
  className = "mb-8 lg:mb-10",
  variant,
}) => {
  const { data: Product = [], isLoading } = useNewSellerProductsQuery({
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
