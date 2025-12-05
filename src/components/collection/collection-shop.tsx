'use client';

import CollectionShopCard from '@/components/collection/collection-shop-card';
import SectionHeader from '@/components/common/section-header';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from '@/utils/routes';
import cn from "classnames";
import React from "react";
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import {LIMITS} from "@/services/utils/limits";
import CategoryCardLoader from "@/components/shared/loaders/category-card-loader";
import {Category} from "@/services/types";

interface Props {
    className?: string;
    uniqueKey?:string;
}

const breakpoints = {
    '1480': {
        slidesPerView: 6,
        spaceBetween: 1
    },
    '1280': {
        slidesPerView: 4,
        spaceBetween: 1
    },
    '1024': {
        slidesPerView: 3,
        spaceBetween: 1
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 1
    },
    '600': {
        slidesPerView: 2,
        spaceBetween: 1
    },
    '0': {
        slidesPerView: 2,
        spaceBetween: 1
    },
};

const CollectionShop: React.FC<Props> = ({
                                             className = 'mb-8 lg:mb-12',
                                             uniqueKey='shopby',
                                         }) => {
    const {data:categories, isLoading} = useCategoriesQuery({
        limit: LIMITS.CATEGORIES_LIMITS,
    });
    return (
        <div className={className}>
            
            <SectionHeader
                sectionHeading={"Shop By <span class=\"font-light\">Categories</span>"}
                className={cn('mb-3')}
            />
            <div className="rounded border border-black/5 bg-black/5 w-full overflow-hidden">
                <Carousel
                    grid={{rows: 2, fill: 'row'}}
                    breakpoints={breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                    className="shopby-categories"
                >
                    {isLoading
                        ? Array.from({length: 12}).map((_, idx) => {
                            return (
                                <SwiperSlide key={`category--key-${idx}`}>
                                    <CategoryCardLoader uniqueKey={`category-card-${idx}`}/>
                                </SwiperSlide>
                            );
                        })
                        : (categories as Category[])?.slice(0, 12)?.map((category: Category) => (
                            <SwiperSlide key={`category--key-${category.id}`}>
                                <CollectionShopCard
                                    key={category.id}
                                    collection={category}
                                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                                />
                            </SwiperSlide>
                        ))}
                </Carousel>
                
            </div>
        </div>
);
};

export default CollectionShop;
