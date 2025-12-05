"use client";
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import {useMemo} from "react";


interface Props {
    data: any;
    isLoading: boolean;
    error?: string | null;
    variant: string;
    uniqueKey?: string;
    banner_url?: string;
    showBanner?: string;
}

const ProductListing: React.FC<Props> = ({
                                             data,
                                             isLoading,
                                             variant,
                                             uniqueKey,
                                             showBanner = false,
                                         }) => {
    
    const breakpoints = useMemo(() => {
        if (showBanner) {
            return {
                '1536': { slidesPerView: 5 },
                '1280': { slidesPerView: 4 },
                '1024': { slidesPerView: 3 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 1 },
            };
        } else if (variant === 'large') {
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
    }, [showBanner, variant]);
    
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
