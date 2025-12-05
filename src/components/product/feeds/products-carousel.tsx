import React from "react";
import SectionHeader from '@/components/common/section-header';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import cn from 'classnames';
import ProductCardFurni from "@/components/product/productListing/productCards/product-card-furni";
import ProductCard from '@/components/product/productListing/productCards/product-card';
import ProductCardVertical from "@/components/product/productListing/productCards/product-card-vertical";
import {BreakpointsType} from "@/services/types";
import useCarouselConfig from "@/hooks/use-carousel-config";


interface ProductsCarouselProps {
    sectionHeading?: string;
    className?: string;
    products: any;
    loading: boolean;
    limit?: number;
    uniqueKey?: string;
    carouselBreakpoint?: BreakpointsType;
    rowCarousel?: number;
    variant?: string;
}


const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
        sectionHeading,
        className = '',
        products,
        loading,
        limit,
        uniqueKey,
        carouselBreakpoint,
        variant = 'default',
        rowCarousel = 1,
    }) => {

    const { spaceBetween, breakpoints } = useCarouselConfig(variant);
   
    return (
        <div className={cn('heightFull relative ', className)}>
            
            {sectionHeading && (
                <>
                    {(() => {
                        switch (variant) {
                            case 'furniture2':
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        sectionSubHeading="The best quality products are waiting for you & choose it now."
                                        headingPosition={"center-xl"}
                                    />
                                );
                          
                            default:
                                return(
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        className={cn('mb-3', {
                                            'block-title': variant === 'default',
                                            'block-title md:mb-5': variant === 'furniture',
                                        })}
                                    />
                                )
                        }
                    })()}
                </>
            )}
            
            <div
                className={cn('relative ', {
                    'border border-black/10 rounded bg-white overflow-hidden md:p-3 lg:p-5': variant === 'cardList' || uniqueKey =='best-sellers4',
                    'after-item-opacity': variant === 'default',
                })}
            >
                <Carousel
                    spaceBetween={spaceBetween}
                    grid={{rows: rowCarousel, fill: 'row'}}
                    breakpoints={carouselBreakpoint || breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                    prevButtonClassName={cn({
                        'start-3  -top-11 3xl:top-auto  sm:rounded drop-shadow-none ': variant === 'furniture',
                        'start-3 xl:start-5 ': variant != 'furniture'})}
                    nextButtonClassName={cn({
                        'end-3 -top-11 3xl:top-auto  sm:rounded drop-shadow-none': variant === 'furniture',
                        'end-3 xl:end-5 ': variant != 'furniture'
                    })}
                >
                    {loading ? (
                        Array.from({length: limit!}).map((_, idx) => (
                            <SwiperSlide
                                key={`${uniqueKey}-${idx}`}
                            >
                                <div className={"p-2 w-56 h-full rounded bg-white"}>
                                    <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`}/>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <>
                            {products?.map((product: any, idx:number) => (
                                <SwiperSlide key={`${uniqueKey}-${idx}`} className="">
                                    {(() => {
                                        switch (variant) {
                                          
                                            case 'furniture2':
                                            case 'furniture':
                                                return (
                                                    <ProductCardFurni
                                                        key={`${uniqueKey}-${product.id}`}
                                                        product={product}
                                                    />
                                                );
                                            case 'cardList':
                                                return (
                                                    <ProductCardVertical
                                                        key={`${uniqueKey}-${product.id}`}
                                                        product={product}
                                                        variant={variant}
                                                    />
                                                );
                                            case 'large':
                                            case 'outBorder':
                                            default:
                                                return (
                                                    <ProductCard
                                                        key={`${uniqueKey}-${product.id}`}
                                                        product={product}
                                                        variant={variant}
                                                    />
                                                );
                                        }
                                    })()}
                                </SwiperSlide>
                            ))}
                        </>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default ProductsCarousel;
