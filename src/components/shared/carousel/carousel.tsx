"use client";
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useRef, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Autoplay, Grid, Navigation, Pagination, Swiper } from '@/components/shared/carousel/slider';

import {usePanel} from "@/hooks/use-panel";
import { colorMap } from '@/data/color-settings';
import { BreakpointsType } from '@/services/types';

type CarouselPropsType = {
    className?: string;
    buttonGroupClassName?: string;
    prevActivateId?: string;
    nextActivateId?: string;
    prevButtonClassName?: string;
    nextButtonClassName?: string;
    buttonSize?: 'default' | 'small';
    centeredSlides?: boolean;
    loop?: boolean;
    slidesPerColumn?: number;
    breakpoints?: BreakpointsType;
    spaceBetween?: number;
    navigation?: boolean;
    pagination?: object | boolean;
    autoplay?: object | boolean;
    grid?: object;
};

export default function Carousel({
                                     children,
                                     className = '',
                                     buttonGroupClassName = '',
                                     prevActivateId = '',
                                     nextActivateId = '',
                                     prevButtonClassName = 'start-3 xl:start-5',
                                     nextButtonClassName = 'end-3 xl:end-5',
                                     buttonSize = 'default',
                                     breakpoints,
                                     navigation = true,
                                     pagination = false,
                                     loop = false,
                                     spaceBetween = 10,
                                     grid,
                                     autoplay,
                                     ...props
                                 }: React.PropsWithChildren<CarouselPropsType>) {
    const { selectedDirection, selectedColor } = usePanel();
    const dir = selectedDirection; // 'ltr' or 'rtl'
    const swiperRef = useRef<any>(null); // Store Swiper instance
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [swiperKey, setSwiperKey] = useState(Date.now()); // Force remount with a key
    
    // Base classes for navigation buttons (without color)
    const baseButtonClasses = useMemo(
        () => ({
            prev: cn(
                'swiper-prev w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:text-brand-light focus:outline-none transform drop-shadow-navigation',
                { '3xl:text-2xl': buttonSize === 'default' },
                colorMap[selectedColor].hoverBg,
                prevButtonClassName
            ),
            next: cn(
                'swiper-next w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:text-brand-light focus:outline-none transform drop-shadow-navigation',
                { '3xl:text-2xl': buttonSize === 'default' },
                colorMap[selectedColor].hoverBg,
                nextButtonClassName
            ),
        }),
        [buttonSize, prevButtonClassName, nextButtonClassName]
    );

    // Clean up Swiper instance on unmount
    useEffect(() => {
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
                swiperRef.current = null;
            }
        };
    }, []);

    // Force remount when direction changes
    useEffect(() => {
        setSwiperKey(Date.now());
    }, [dir]);

    // Setup and update navigation
    useEffect(() => {
        if (swiperRef.current && navigation) {
            // Safely update navigation if it exists
            if (swiperRef.current.navigation) {
                const prevEl = prevActivateId ? document.getElementById(prevActivateId) : prevRef.current;
                const nextEl = nextActivateId ? document.getElementById(nextActivateId) : nextRef.current;

                if (prevEl && nextEl) {
                    swiperRef.current.navigation.destroy();
                    swiperRef.current.navigation.init();
                    swiperRef.current.navigation.update();
                }
            }
        }
    }, [navigation, prevActivateId, nextActivateId, swiperRef.current]);

    return (
        <div
            className={`carouselWrapper relative ${className} ${
                pagination ? 'dotsCircle' : 'dotsCircleNone'
            }`}
            dir={dir}
        >
            <Swiper
                key={swiperKey} // Force remount with this key
                dir={dir}
                className={`${dir === 'rtl' ? 'swiper-rtl' : ''}`}
                modules={[Navigation, Autoplay, Pagination, Grid]}
                autoplay={autoplay}
                breakpoints={breakpoints}
                spaceBetween={spaceBetween}
                pagination={
                    pagination
                        ? {
                            clickable: true,
                            bulletClass: `swiper-pagination-bullet`,
                            bulletActiveClass: `swiper-pagination-bullet-active bg-primary-500`,
                        }
                        : false
                }
                grid={grid}
                navigation={
                    navigation
                        ? {
                            prevEl: prevActivateId ? `#${prevActivateId}` : prevRef.current,
                            nextEl: nextActivateId ? `#${nextActivateId}` : nextRef.current,
                        }
                        : false
                }
                loop={loop}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                {...props}
            >
                {children}
            </Swiper>

            {navigation && (
                <div
                    className={`swiper-button flex items-center box-content w-full absolute z-10 ${
                        buttonGroupClassName ? buttonGroupClassName : 'top-2/4'
                    }`}
                >
                    {prevActivateId ? (
                        <div className={baseButtonClasses.prev} id={prevActivateId}>
                            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
                        </div>
                    ) : (
                        <div ref={prevRef} className={baseButtonClasses.prev}>
                            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
                        </div>
                    )}

                    {nextActivateId ? (
                        <div className={baseButtonClasses.next} id={nextActivateId}>
                            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </div>
                    ) : (
                        <div ref={nextRef} className={baseButtonClasses.next}>
                            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}