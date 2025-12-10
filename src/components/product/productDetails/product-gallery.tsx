import React, { useMemo } from "react";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import cn from "classnames";
import { productPlaceholder } from "@/assets/placeholders";

interface GalleryProps {
  className?: string;
  variant?: "default" | "right" | "bottom";
  data?: Product;
  enableVideo?: boolean;
  attributes?: { [key: string]: string };
}

const ProductGallery: React.FC<GalleryProps> = ({
  data,
  variant = "default",
  className,
  attributes,
}) => {
  // In product-gallery.tsx
  const gallery = useMemo(() => {
    return data?.gallery || [];
  }, [data?.gallery]);

  const activeIndex = useMemo(() => {
    if (!data || !attributes || !attributes["color"]) return 0;

    const matchedOption = data?.variation_options?.find((option) =>
      option?.options?.some(
        (o) => o.name === "color" && o.value === attributes["color"]
      )
    );
    const image = matchedOption?.image ?? data?.image?.original;
    const index = data?.gallery?.findIndex((img) => img.original === image);

    // Return 0 if index is undefined or -1
    return typeof index === "number" && index >= 0 ? index : 0;
  }, [data, attributes]);

  return (
    <div className={cn("mb-6 md:mb-8 lg:mb-0", className)}>
      {!!data?.gallery?.length ? (
        <ThumbnailCarousel
          gallery={gallery}
          thumbnailClassName="xl:w-full"
          galleryClassName="xl:w-[100px]"
          variant={variant}
          activeIndex={activeIndex}
        />
      ) : (
        <div className="flex items-center justify-center w-auto">
          <Image
            src={data?.image?.original ?? productPlaceholder}
            alt={data?.name ?? "product name"}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};
export default ProductGallery;
