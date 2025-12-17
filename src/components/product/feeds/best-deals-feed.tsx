"use client";
import SectionHeader from "@/components/common/section-header";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import React from "react";
import ProductBestDealsCard from "@/components/product/productListing/productCards/best-deal-card";
import Loading from "@/components/shared/loading";
import { useDeals } from "@/hooks/use-deals";
import SpecialDealBanner from "@/components/deals/special-deal-banner";

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
  const { mainDeals, specialDeals, isLoading } = useDeals();

  return (
    <div className={`mb-8 lg:mb-10  ${className}`}>
      <SectionHeader
        sectionHeading="Deals of the week"
        className="mb-6 block-title"
      />
      <div className="heightFull relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-4">
          <div>
            {isLoading ? (
              <Loading />
            ) : mainDeals && mainDeals.length > 0 ? (
              <Carousel
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
              >
                {mainDeals.map((deal, idx) => (
                  <SwiperSlide key={`${uniqueKey}-${idx}`}>
                    <ProductBestDealsCard
                      variant={variant}
                      key={`best-deal-${deal._id}`}
                      product={deal.raw.products?.[0]}
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

          {/* Right-side special deals banner area */}
          {specialDeals && specialDeals.length > 0 && (
            <div className="h-full">
              <div
                className={`grid gap-4 ${
                  specialDeals.length > 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-1"
                }`}
              >
                {specialDeals.map((deal) => (
                  <SpecialDealBanner key={deal._id} deal={deal} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDealsFeed;
