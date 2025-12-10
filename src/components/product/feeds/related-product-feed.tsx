// components/product/feeds/related-product-feed.tsx
import ProductsCarousel from "@/components/product/feeds/products-carousel";
import { useRelatedProductsQuery } from "@/services/product/get-related-product";
import { LIMITS } from "@/services/utils/limits";

interface RelatedProductsProps {
  slug?: string; // 👈 optional
  carouselBreakpoint?: {};
  className?: string;
  uniqueKey?: string;
}

const RelatedProductSlider: React.FC<RelatedProductsProps> = ({
  slug = "",
  carouselBreakpoint,
  className,
  uniqueKey = "related-product-popup",
}) => {
  const { data, isLoading } = useRelatedProductsQuery(
    slug,
    LIMITS.RELATED_PRODUCTS_LIMITS
  );

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  // agar slug na ho → empty render
  if (!slug) return null;

  return (
    <ProductsCarousel
      sectionHeading="Related Products"
      className={className}
      products={products}
      loading={isLoading}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductSlider;
