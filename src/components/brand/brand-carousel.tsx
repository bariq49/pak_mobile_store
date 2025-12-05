'use client';

import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import BrandCard from '@/components/brand/brand-card';
import cn from "classnames";

const data = [
    {
        id: 1,
        href: '#',
        image: '/assets/images/brand/brand_8_1.jpg',
        title: 'collection-title-one',
    },
    {
        id: 2,
        href: '#',
        image: '/assets/images/brand/brand_8_2.jpg',
        title: 'collection-title-two',
    },
    {
        id: 3,
        href: '#',
        image: '/assets/images/brand/brand_8_3.jpg',
        title: 'collection-title-three',
    },
    {
        id: 4,
        href: '#',
        image: '/assets/images/brand/brand_8_4.jpg',
        title: 'collection-title-four',
    },
    {
        id: 5,
        href: '#',
        image: '/assets/images/brand/brand_8_5.jpg',
        title: 'collection-title-five',
    },
    {
        id: 6,
        href: '#',
        image: '/assets/images/brand/brand_8_6.jpg',
        title: 'collection-title-five',
    },
    {
        id: 7,
        href: '#',
        image: '/assets/images/brand/brand_8_1.jpg',
        title: 'collection-title-one',
    },
];

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}

const breakpoints = {
    '1040': {
        slidesPerView: 5,
    },
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 3,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 2,
    },
};

const BrandCarousel: React.FC<Props> = ({
                                            className = '',
                                            variant ,
                                            uniqueKey='brand',
                                        }) => {
    const {width} = useWindowSize();
    const classRoot =  variant == "home4" ? "rounded border border-black/10  py-5 px-5 md:py-5 bg-white " : "border-t border-black/10  py-5  md:py-10 ";
    return (
        <div className={cn(classRoot,className)}>

            {width! < 1536 ? (
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                >
                    {data?.map((item) => (
                        <SwiperSlide
                            key={`collection-key-${item.id}`}
                        >
                            <BrandCard
                                key={item.id}
                                collection={item}
                            />
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="gap-5 2xl:grid 2xl:grid-cols-7 3xl:gap-5">
                    {data?.map((item) => (
                        <BrandCard
                            key={item.id}
                            collection={item}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default BrandCarousel;
