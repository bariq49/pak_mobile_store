import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { useRelatedProductsQuery } from '@/services/product/get-related-product';
import { LIMITS } from '@/services/utils/limits';

interface RelatedProductsProps {
  carouselBreakpoint?: {} ;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductSlider: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { data: Product=[], isLoading } = useRelatedProductsQuery({
    limit: LIMITS.RELATED_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="Related Products"
      className={className}
      products={Product}
      loading={isLoading}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductSlider;
