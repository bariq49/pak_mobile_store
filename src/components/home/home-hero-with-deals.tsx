"use client";

import React from "react";
import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import ServiceFeature from "@/components/common/service-featured";
import { useDeals } from "@/hooks/use-deals";
import { homeThreeHeroCarousel as fallbackHeroCarousel } from "@/components/banner/data";
import SpecialDealBanner from "@/components/deals/special-deal-banner";

const HomeHeroWithDeals: React.FC = () => {
  const { specialDeals, isLoading } = useDeals();
  const hasSpecial = specialDeals && specialDeals.length > 0;

  return (
    <Container variant={"Large"}>
      <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
        <HeroSliderBlock />

        {/* Right side: special deal variants as dynamic banners */}
        <div className="mb-7 staticBanner--slider">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[220px]">
              <p className="text-gray-500">Loading deals...</p>
            </div>
          ) : hasSpecial ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1">
              {specialDeals.slice(0, 2).map((deal) => (
                <SpecialDealBanner key={deal._id} deal={deal} />
              ))}
            </div>
          ) : (
            // Fallback to existing static banners if no special deals are available
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1">
              {fallbackHeroCarousel.map((banner, index) => {
                const fallbackDeal: any = {
                  _id: String(banner.id || index),
                  title: banner.title,
                  description: "",
                  dealVariant: "FALLBACK",
                  imageMobile: banner.image?.mobile?.url,
                  imageDesktop: banner.image?.desktop?.url,
                  ctaText: "Shop Now",
                  ctaUrl: banner.slug || "/",
                  // Minimal Deal-like shape for `raw`
                  raw: {
                    _id: String(banner.id || index),
                    title: banner.title,
                    description: "",
                    products: [],
                    image: {
                      mobile: { url: banner.image?.mobile?.url || "" },
                      desktop: { url: banner.image?.desktop?.url || "" },
                    },
                  },
                } as const;

                return <SpecialDealBanner key={fallbackDeal._id} deal={fallbackDeal} />;
              })}
            </div>
          )}
        </div>
      </div>
      <ServiceFeature />
    </Container>
  );
};

export default HomeHeroWithDeals;


