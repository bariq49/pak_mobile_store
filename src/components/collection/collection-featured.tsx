'use client';

import CollectionFeaturedCard from "@/components/collection/collection-featured-card";
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import SectionHeader from "@/components/common/section-header";
import React from "react";
import CategoryListCardLoader from "../shared/loaders/category-list-card-loader";


interface Props {
    className?: string;
    headingPosition?: 'left' | 'center-xl';
    uniqueKey?: string;
}

const breakpoints = {
    '1280': {
        slidesPerView: 5,
    },
    '1024': {
        slidesPerView: 4,
    },
    '640': {
        slidesPerView: 3,
    },
    '360': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};

const CollectionFeatured: React.FC<Props> = ({
                                             className = 'mb-12 lg:mb-20 mx-4',
                                             uniqueKey,
                                             headingPosition = 'center-xl',
                                         }) => {
    const CATEGORIES_LIMITS = 5;
    const {data:categories, isLoading} = useCategoriesQuery({
        limit: CATEGORIES_LIMITS,
    });
    return (
        <div className={className}>
            <SectionHeader
                sectionHeading={"Featured Categories"}
                sectionSubHeading="The best quality products are waiting for you & choose it now."
                headingPosition={headingPosition}
            />
            <Carousel
                spaceBetween={20}
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
                grid={{ rows: 1, fill: 'row' }}
            >
                {isLoading
                    ? Array.from({ length: 6 }).map((_, idx) => {
                        return (
                            <SwiperSlide
                                className="p-1.5 md:p-2"
                                key={`category--key-${idx}`}
                            >
                                <CategoryListCardLoader
                                    uniqueKey={`category-card-${idx}`}
                                />
                            </SwiperSlide>
                        );
                    })
                    : categories?.slice(0, CATEGORIES_LIMITS).map((category) => (
                        <SwiperSlide
                            key={`category--key-${category.id}`}
                        >
                            <CollectionFeaturedCard
                                key={category.id}
                                category={category}
                            />
                        </SwiperSlide>
                    ))}
            </Carousel>
        
        </div>
    );
};

export default CollectionFeatured;
