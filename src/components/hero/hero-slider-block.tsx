"use client";

import HeroSliderCard from "@/components/hero/hero-slider-card";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import { useDealsQuery } from "@/services/deals/get-banner-deals";

export default function HeroSliderBlock() {
  const { data: deals, isLoading, isError } = useDealsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading deals...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-red-500">Failed to load deals.</p>
      </div>
    );

  if (!deals?.length)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">No active deals available.</p>
      </div>
    );

  return (
    <div className="mb-7">
      <Carousel
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        prevActivateId="prevActivateId"
        nextActivateId="nextActivateId"
      >
        {deals.map((deal, index) => (
          <SwiperSlide key={`hero-slider-${deal._id || index}`}>
            <HeroSliderCard banner={deal} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
