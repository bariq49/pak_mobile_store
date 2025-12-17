"use client";

import HeroSliderCard from "@/components/hero/hero-slider-card";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import { useDeals } from "@/hooks/use-deals";

export default function HeroSliderBlock() {
  const { mainDeals, isLoading, isError } = useDeals();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading deals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-red-500">Failed to load deals.</p>
      </div>
    );
  }

  const sliderDeals = mainDeals.map((d) => d.raw);

  if (!sliderDeals.length) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">No active main deals available.</p>
      </div>
    );
  }

  return (
    <div className="mb-7">
      <Carousel
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        prevActivateId="prevActivateId"
        nextActivateId="nextActivateId"
      >
        {sliderDeals.map((deal, index) => (
          <SwiperSlide key={`hero-slider-${deal._id || index}`}>
            <HeroSliderCard banner={deal} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}

