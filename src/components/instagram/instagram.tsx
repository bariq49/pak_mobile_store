'use client';

import InstagramCard from '@/components/instagram/instagram-card';
import SectionHeader from '@/components/common/section-header';
import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';

const data = [
    {
        id: 1,
        slug: '#',
        image: '/assets/images/instagram/instagram_1.png',
        title: 'collection-title-one',
    },
    {
        id: 2,
        slug: '#',
        image: '/assets/images/instagram/instagram_2.png',
        title: 'collection-title-two',
    },
    {
        id: 3,
        slug: '#',
        image: '/assets/images/instagram/instagram_3.png',
        title: 'collection-title-three',
    },
    {
        id: 4,
        slug: '#',
        image: '/assets/images/instagram/instagram_4.png',
        title: 'collection-title-four',
    },
    {
        id: 5,
        slug: '#',
        image: '/assets/images/instagram/instagram_5.png',
        title: 'collection-title-five',
    },
    {
        id: 6,
        slug: '#',
        image: '/assets/images/instagram/instagram_6.png',
        title: 'collection-title-five',
    }
];

interface Props {
    className?: string;
    headingPosition?: 'left' | 'center';
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

const InstagramGrid: React.FC<Props> = ({
                                         className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
                                         headingPosition = 'center',
                                     }) => {
    const {width} = useWindowSize();
    return (
        <div className={className}>

            <SectionHeader
                sectionHeading="@Razor on Instagram"
                sectionSubHeading="Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas."
                headingPosition={headingPosition}
            />
            {width! < 1536 ? (
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId="collection-carousel-button-prev"
                    nextActivateId="collection-carousel-button-next"
                >
                    {data?.map((item) => (
                        <SwiperSlide
                            key={`collection-key-${item.id}`}
                        >
                            <InstagramCard
                                key={item.id}
                                collection={item}
                                href={`${item.slug}`}
                            />
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="gap-5 2xl:grid 2xl:grid-cols-6 3xl:gap-5">
                    {data?.map((item) => (
                        <InstagramCard
                            key={item.id}
                            collection={item}
                            href={`${item.slug}`}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default InstagramGrid;
