import {LIMITS} from "@/services/utils/limits";
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import {BreakpointsType} from "@/services/types";
import {useMemo} from "react";

interface Props {
    data: any;
    isLoading: boolean;
    rowCarousel?: number;
    showBanner?: boolean;
    uniqueKey?: string;
}
const SupperCategoryContainer: React.FC<Props> = ({data, isLoading, rowCarousel=1, showBanner,uniqueKey}) => {
    const breakpoints = useMemo<BreakpointsType>(() => {
        if (showBanner) {
            return {
                '1536': { slidesPerView: 5 },
                '1280': { slidesPerView: 4 },
                '1024': { slidesPerView: 4 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 1 },
            };
        }
        return {
            '1536': { slidesPerView: 5 },
            '1280': { slidesPerView: 4 },
            '1024': { slidesPerView: 4 },
            '640': { slidesPerView: 3 },
            '360': { slidesPerView: 2 },
            '0': { slidesPerView: 1 },
        };
    }, [showBanner]);
    
    return (
        <ProductsCarousel
            sectionHeading=""
            products={data}
            loading={isLoading}
            limit={LIMITS.FASHION_PRODUCTS_LIMITS}
            uniqueKey={uniqueKey}
            carouselBreakpoint={breakpoints}
            rowCarousel={rowCarousel}
        />
    );
};
export default SupperCategoryContainer;
