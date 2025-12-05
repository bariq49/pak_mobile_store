'use client';

import HeroSliderCard from '@/components/hero/hero-slider-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';

interface Props {
    heroBanner?: any;
    className?: string;
    variant?: string;
    contentClassName?: string;
    showHeroContent?: boolean;
}

const HeroSliderBlock: React.FC<Props> = ({
          heroBanner,
          variant='hero',
          className = 'mb-7',
          contentClassName = 'px-5 py-10 xl:py-24',
          showHeroContent = true,
      }) => {
    return (
        <div className={`${className}`}>
            <Carousel
                pagination={{
                    clickable: true,
                }}
                autoplay={false}
                prevActivateId={`prevActivateId`}
                nextActivateId={`nextActivateId`}
            >
                {heroBanner?.map((banner: never,index:number) => (
                    <SwiperSlide key={`hero-slider${index}`}>
                        <HeroSliderCard
                            banner={banner}
                            variant={variant}
                            className={contentClassName}
                            heroContentCard={showHeroContent}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSliderBlock;
