import React, { useMemo } from "react";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import cn from "classnames";
import { productPlaceholder } from "@/assets/placeholders";
import { findMatchingVariant } from "@/services/utils/convert-variants-to-variations";
import { useCart } from "@/hooks/use-cart";

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
  const { useCartHelpers } = useCart();
  const { outOfStock } = useCartHelpers();
  
  // Check if product is out of stock
  const isOutOfStock = data ? (outOfStock(data.id) || (data.quantity ?? 0) < 1) : false;
  
  // Find matching variant if attributes are selected
  const matchingVariant = useMemo(() => {
    if (!data?.variants || !attributes || Object.keys(attributes).length === 0) {
      return null;
    }
    return findMatchingVariant(data.variants, attributes);
  }, [data?.variants, attributes]);

  // Get variant image if available
  const variantImage = useMemo(() => {
    if (!matchingVariant) return null;
    
    // Check multiple possible image field names
    const image = matchingVariant.image || 
                  (matchingVariant as any).imageUrl || 
                  (matchingVariant as any).thumbnail ||
                  (matchingVariant as any).image_url ||
                  (matchingVariant as any).img;
    
    // Return image only if it's a valid non-empty string
    if (image && typeof image === "string" && image.trim() !== "") {
      return image.trim();
    }
    return null;
  }, [matchingVariant]);

  // Build gallery with variant image if available
  const gallery = useMemo(() => {
    const baseGallery = data?.gallery || [];
    
    // If variant has an image, prepend it to the gallery or replace the first image
    if (variantImage) {
      const variantImageObj = {
        original: variantImage,
        thumbnail: variantImage,
        original2: variantImage,
      };
      
      // Check if variant image already exists in gallery
      const existingIndex = baseGallery.findIndex(
        (img: any) => img.original === variantImage || img.thumbnail === variantImage
      );
      
      if (existingIndex >= 0) {
        // If exists, move it to the front
        const updatedGallery = [...baseGallery];
        const [variantImg] = updatedGallery.splice(existingIndex, 1);
        return [variantImg, ...updatedGallery];
      } else {
        // If not exists, add it to the front
        return [variantImageObj, ...baseGallery];
      }
    }
    
    return baseGallery;
  }, [data?.gallery, variantImage]);

  const activeIndex = useMemo(() => {
    // If variant image exists, it's always at index 0
    if (variantImage) {
      return 0;
    }
    
    // Fallback to old logic for color-based matching
    if (!data || !attributes || !attributes["color"]) return 0;

    const matchedOption = data?.variation_options?.find((option) =>
      option?.options?.some(
        (o) => o.name === "color" && o.value === attributes["color"]
      )
    );
    const image = matchedOption?.image ?? data?.image?.original;
    const index = gallery.findIndex((img: any) => img.original === image);

    // Return 0 if index is undefined or -1
    return typeof index === "number" && index >= 0 ? index : 0;
  }, [data, attributes, variantImage, gallery]);

  // Determine the image to display when no gallery
  const displayImage = useMemo(() => {
    if (variantImage) {
      return variantImage;
    }
    return data?.image?.original ?? productPlaceholder;
  }, [variantImage, data?.image?.original]);

  return (
    <div className={cn("mb-6 md:mb-8 lg:mb-0 relative", className)}>
      {gallery.length > 0 ? (
        <div className="relative">
          <ThumbnailCarousel
            gallery={gallery}
            thumbnailClassName="xl:w-full"
            galleryClassName="xl:w-[100px]"
            variant={variant}
            activeIndex={activeIndex}
          />
          {isOutOfStock && (
            <span className="absolute top-3 left-3 z-10 text-[11px] md:text-xs font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-2.5 pt-1 pb-[3px]">
              Out of Stock
            </span>
          )}
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-auto">
          <Image
            src={displayImage}
            alt={data?.name ?? "product name"}
            width={500}
            height={500}
          />
          {isOutOfStock && (
            <span className="absolute top-3 left-3 z-10 text-[11px] md:text-xs font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-2.5 pt-1 pb-[3px]">
              Out of Stock
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductGallery;
