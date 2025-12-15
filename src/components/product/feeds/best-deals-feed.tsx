"use client";
import { usePopularProductsQuery } from "@/services/product/get-all-popular-products";
import SectionHeader from "@/components/common/section-header";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import { LIMITS } from "@/services/utils/limits";

import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import React from "react";

import ProductBestDealsCard from "@/components/product/productListing/productCards/best-deal-card";
import Loading from "@/components/shared/loading";

interface ProductFeedProps {
  className?: string;
  uniqueKey?: string;
  variant?: string;
}

const breakpoints = {
  "1280": {
    slidesPerView: 2,
  },
  "1024": {
    slidesPerView: 1,
  },
  "640": {
    slidesPerView: 1,
  },
  "0": {
    slidesPerView: 1,
  },
};

const BestDealsFeed: React.FC<ProductFeedProps> = ({
  className = "",
  uniqueKey = "product-with-bestdeal",
  variant = "bestdeal",
}) => {
  const limit = LIMITS.BEST_SELLER_PRODUCTS_LIMITS;
  const { data, isLoading } = usePopularProductsQuery({
    limit: limit,
  });

  return (
    <div className={`mb-8 lg:mb-10  ${className}`}>
      <SectionHeader
        sectionHeading="Deals of the week"
        className="mb-6 block-title"
      />
      <div className="heightFull relative">
        {isLoading ? (
          <Loading />
        ) : data && data.length > 0 ? (
          <Carousel
            breakpoints={breakpoints}
            prevActivateId={`prev${uniqueKey}`}
            nextActivateId={`next${uniqueKey}`}
          >
            {data.slice(0, limit).map((product: any, idx) => (
              <SwiperSlide key={`${uniqueKey}-${idx}`}>
                <ProductBestDealsCard
                  variant={variant}
                  key={`best-product-${product.id}`}
                  product={product}
                  date={Date.now() + 4000000 * 60}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center bg-white rounded py-5">
            <p className="text-brand-dark">No Deals available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestDealsFeed;
