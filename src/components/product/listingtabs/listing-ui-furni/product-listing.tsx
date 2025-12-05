"use client";
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import {useMemo} from "react";


interface Props {
    data: any;
    isLoading: boolean;
    error?: string | null;
    variant: string;
    uniqueKey?: string;
}

const ProductListing: React.FC<Props> = ({
                                             data,
                                             isLoading,
                                             variant,
                                             uniqueKey,
                                         }) => {
    
    const breakpoints = useMemo(() => {
        if (variant === 'large') {
            return {
                '1536': { slidesPerView: 7 },
                '1280': { slidesPerView: 5 },
                '1024': { slidesPerView: 4 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 1 },
            };
        } else {
            return {
                '1536': { slidesPerView: 6 },
                '1280': { slidesPerView: 5 },
                '1024': { slidesPerView: 3 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 1 },
            };
        }
    }, [ variant]);
    
    return (
        <ProductsCarousel
            products={data}
            loading={isLoading}
            uniqueKey={uniqueKey}
            variant={variant}
            carouselBreakpoint={breakpoints}
        />
    );
};
export default ProductListing;
