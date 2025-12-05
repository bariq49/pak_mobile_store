'use client';

import LicenseIcon from '@/components/icons/featured/license-icon';
import FeedbackIcon from '@/components/icons/featured/feedback-icon';
import RocketIcon from "@/components/icons/featured/rocket-icon";
import SyncIcon from "@/components/icons/featured/sync-icon";
import ThumbsIcon from "@/components/icons/featured/thumbs-icon";

import FeaturedCard from '@/components/cards/featured-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from "@/utils/routes";
import cn from "classnames";
import React, {useMemo} from 'react';

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}



const ServiceFeature: React.FC<Props> = ({
                                              variant = 'default',
                                             uniqueKey='services',
                                              className = 'mb-8 md:mb-10',
                                          }) => {
    const data = [
        {
            id: 1,
            icon: (
                <RocketIcon  color="text-brand-dark"/>
            ),
            title: 'Free Shipping',
            description: 'Free Shipping On All Order',
            href: ROUTES.HOME,
        },
        {
            id: 2,
            icon: (
                <SyncIcon   color="text-brand-dark"/>
            ),
            title: 'Money Guarantee',
            description: '30 Day Money Back Guarantee',
            href: ROUTES.HOME,
        },
        {
            id: 3,
            icon: (
                <FeedbackIcon   color="text-brand-dark"/>
            ),
            title: 'Online Support 24/7',
            description: 'Technical Support 24/7',
            href: ROUTES.HOME,
        },
        {
            id: 4,
            icon: (
                <ThumbsIcon  color="text-brand-dark"/>
            ),
            title: 'Member Discount',
            description: 'Upto 40% Discount All Products',
            href: ROUTES.HOME,
        },
        {
            id: 5,
            icon: (
                <LicenseIcon  color="text-brand-dark"/>
            ),
            title: 'Secure Payment',
            description: 'All Cards Accepted',
            href: ROUTES.HOME,
        },
    ];
    
    
    const breakpoints = useMemo(() => ({
        '1280': {
            slidesPerView: 5,
        },
        '1024': {
            slidesPerView: 4,
        },
        '640': {
            slidesPerView: 2,
        },
        '360': {
            slidesPerView: 1,
        },
        '0': {
            slidesPerView: 1,
        },
    }), []);
    
    return (
        <div className={cn(
                 'group',{
                     'bg-white rounded-md border border-black/10 py-6': variant === 'default' ,
                 },
                 className
             )}
        >
            <Carousel
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
            >
                {data?.map((item) => (
                    <SwiperSlide key={`featured-key-${item.id}`}>
                        <FeaturedCard item={item}  variant={variant}/>
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default ServiceFeature;
