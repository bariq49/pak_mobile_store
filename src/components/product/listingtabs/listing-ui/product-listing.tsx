"use client";
import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { useMemo } from "react";

interface Props {
  data: any;
  isLoading: boolean;
  uniqueKey?: string;
}

const ProductListing: React.FC<Props> = ({ data, isLoading, uniqueKey }) => {
  const breakpoints = useMemo(() => {
    return {
      "1536": { slidesPerView: 6 },
      "1280": { slidesPerView: 5 },
      "1024": { slidesPerView: 3 },
      "640": { slidesPerView: 3 },
      "360": { slidesPerView: 2 },
      "0": { slidesPerView: 1 },
    };
  }, []);

  return (
    <ProductsCarousel
      products={data}
      loading={isLoading}
      uniqueKey={uniqueKey}
      carouselBreakpoint={breakpoints}
    />
  );
};

export default ProductListing;
