'use client';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from '@/utils/routes';
import {useBlogsQuery} from '@/services/blog/get-all-blogs';
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import React, {useMemo} from "react";
import cn from "classnames";
import LatestblogCard from "@/components/blog/latestblog-card";
import {LIMITS} from "@/services/utils/limits";
import SectionHeader from "@/components/common/section-header";

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}

const LatestblogCarousel: React.FC<Props> = ({
                                         className,
                                         variant='default',
                                         uniqueKey='latestblog',
                                     }) => {
    const {data:dataBlog, isLoading} = useBlogsQuery();
    const limit = LIMITS.LATEST_BLOG_LIMITS;
    const spaceBetween= 20;
    const breakpoints = useMemo(() => {
        switch (variant) {
            case "furniture2":
                return {
                    1536: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 2 },
                    360: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                };

            default:
                return {
                    1536: { slidesPerView: 5 },
                    1280: { slidesPerView: 3 },
                    1024: { slidesPerView: 2 },
                    640: { slidesPerView: 2 },
                    360: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                };
        }
    }, [variant]);


    
    return (
        <div className={cn('heightFull relative mb-8 lg:mb-12', className)}>
            <>
                {(() => {
                    switch (variant) {
                        case 'furniture2':
                            return (
                                <SectionHeader
                                    sectionHeading={"From The Blog"}
                                    sectionSubHeading="The best quality products are waiting for you & choose it now."
                                    headingPosition={"center-xl"}
                                />
                            );
                        
                        case 'noHeading':
                            break;
                        default:
                            return(
                                <SectionHeader
                                    sectionHeading={"From The <span class=\"font-light\"> Blog</span>"}
                                    className={cn('mb-3', {
                                        'block-title': variant === 'default',
                                        'block-title md:mb-5': variant === 'furniture',
                                    })}
                                />
                            )
                    }
                })()}
            </>
            
           
            
            <div
                className={cn('relative ', {
                    'border border-black/10 rounded bg-white overflow-hidden p-3 lg:p-5': variant === 'cardList' || variant =='home4',
                })}
            >
                <Carousel
                    spaceBetween={spaceBetween}
                    breakpoints={breakpoints}
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
                    {isLoading  ? (
                        Array.from({length: limit}).map((_, idx) => (
                            <SwiperSlide
                                key={`latestblog-${idx}`}
                            >
                                <div className="p-2 w-85 h-full rounded bg-white">
                                    <ProductCardLoader uniqueKey={`latestblog-${idx}`}/>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <>
                            {dataBlog?.slice(0, limit)?.map((item) => (
                                <SwiperSlide
                                    key={`collection-key-${item.id}`}
                                >
                                    <LatestblogCard
                                        variant={variant}
                                        key={item.id}
                                        collection={item}
                                        href={`${ROUTES.BLOG}/${item.slug}`}
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

export default LatestblogCarousel;
