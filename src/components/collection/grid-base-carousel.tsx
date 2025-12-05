'use client';

import React from "react";
import dynamic from 'next/dynamic';

import {ROUTES} from '@/utils/routes';
import {SwiperSlide} from 'swiper/react';
import {LIMITS} from '@/services/utils/limits';
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import SectionHeader from '@/components/common/section-header';
import cn from 'classnames';
import GridBaseCard from "@/components/collection/grid-base-card";
import CategoryCardLoader from "@/components/shared/loaders/category-card-loader";
import {Category} from "@/services/types";
const Carousel = dynamic(() => import('@/components/shared/carousel/carousel'), {
    ssr: false,
});

interface CategoriesProps {
    className?: string;
    limit?: number;
    variant?: string;
    uniqueKey?:string;
}



const GridBaseCarousel: React.FC<CategoriesProps> = ({
                                                          className = 'mb-8 lg:mb-10 ',
                                                          limit = 6,
                                                          variant='default',
                                                         uniqueKey='shopby',
                                                      }) => {
    const {data:categories, isLoading} = useCategoriesQuery({
        limit: LIMITS.CATEGORIES_LIMITS,
    });
    const breakpoints = {
        '1480': {
            slidesPerView: limit,
            spaceBetween: 15
        },
        '1280': {
            slidesPerView: 5,
            spaceBetween: 15
        },
        '1024': {
            slidesPerView: 5,
            spaceBetween: 15
        },
        '768': {
            slidesPerView: 3,
            spaceBetween: 15
        },
        '600': {
            slidesPerView: 2,
            spaceBetween: 10
        },
        '0': {
            slidesPerView: 2,
            spaceBetween: 10
        },
    };
    
    
    return (
        <div className={className}>
            <SectionHeader
                sectionHeading={"Shop By <span class=\"font-light\">Categories</span>"}
                className={cn('mb-6 block-title')}
            />

            <div className=" w-full overflow-hidden">
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                >
                    {isLoading
                        ? Array.from({length: limit}).map((_, idx) => {
                            return (
                                <SwiperSlide key={`category--key-${idx}`}>
                                    <CategoryCardLoader uniqueKey={`category-card-${idx}`}/>
                                </SwiperSlide>
                            );
                        })
                        : (categories as Category[])?.slice(0, limit)?.map((category: Category) => (
                            <SwiperSlide key={`category--key-${category.id}`}>
                                <GridBaseCard
                                    item={category}
                                    variant={variant}
                                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                                />
                            </SwiperSlide>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default GridBaseCarousel;
