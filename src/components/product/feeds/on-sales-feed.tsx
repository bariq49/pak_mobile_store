"use client";
import SectionHeader from "@/components/common/section-header";
import { LIMITS } from "@/services/utils/limits";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import React from "react";
import Loading from "@/components/shared/loading";
import { useSaleProductsQuery } from "@/services/product/get-all-sale-products";
import ProductSaleCard from "../productListing/productCards/on-sales-card";

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

const SaleProductsFeed: React.FC<ProductFeedProps> = ({
  className = "",
  uniqueKey = "sale-products",
  variant = "sale",
}) => {
  const limit = LIMITS.SALE_PRODUCTS_LIMIT;
  const { data, isLoading } = useSaleProductsQuery({
    limit: limit,
  });

  return (
    <div className={`mb-8 lg:mb-10  ${className}`}>
      <SectionHeader
        sectionHeading="Sales of  the Week"
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
                <ProductSaleCard
                  variant={variant}
                  key={`sale-product-${product.id}`}
                  product={product}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center bg-white rounded py-5">
            <p className="text-brand-dark">No Sale Products Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleProductsFeed;
