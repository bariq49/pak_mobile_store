import SectionHeader from '@/components/common/section-header';
import {BreakpointsType, Product} from '@/services/types';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import cn from 'classnames';

import React from "react";
import ProductCardVertical from "@/components/product/productListing/productCards/product-card-vertical";


interface ProductsCarouselProps {
    sectionHeading?: string;
    className?: string;
    products: Product[];
    loading: boolean;
    limit?: number;
    uniqueKey?: string;
    carouselBreakpoint?: BreakpointsType;
    rowCarousel?: number;
    variant?: string;
}
const breakpoints = {
    '1024': {
        slidesPerView: 1,
    },
    '640': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};


const ProductsCarouselVertical: React.FC<ProductsCarouselProps> = ({
        sectionHeading,
        className = '',
        products,
        loading,
        limit,
        uniqueKey,
        carouselBreakpoint,
        variant = 'default',
        rowCarousel = 3,
    }) => {

    
    return (
        <div className={cn(' ', className)}>
            {sectionHeading && (
                <SectionHeader
                    sectionHeading={sectionHeading}
                    className={cn('mb-5 md:mb-6', {
                        'block-title': variant === 'default',
                    })}
                />
            )}
            
            <div className={cn('heightFull relative extraslider--sidebar')}>
                <Carousel
                    grid={{rows: rowCarousel, fill: 'row'}}
                    breakpoints={carouselBreakpoint || breakpoints}
                    spaceBetween={0}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                    buttonGroupClassName="-top-11"
                    prevButtonClassName="end-8 -translate-y-2 "
                    nextButtonClassName="end-0 -translate-y-2"
                >
                    {loading ? (
                        Array.from({length: limit!}).map((_, idx) => (
                            <SwiperSlide
                                key={`${uniqueKey}-${idx}`}
                            >
                                <div className={"p-2 w-56 h-full  bg-white"}>
                                    <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`}/>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <>
                            {products?.map((product: Product, idx) => (
                                <SwiperSlide key={`${uniqueKey}-${idx}`} >
                                    <ProductCardVertical
                                        key={`${uniqueKey}-${product.id}`}
                                        product={product}
                                        variant={variant}
                                    />
                                </SwiperSlide>
                            ))}
                        </>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default ProductsCarouselVertical;
