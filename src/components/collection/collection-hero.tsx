'use client';

import CollectionHeroCard from '@/components/collection/collection-hero-card';

import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';


interface Props {
    className?: string;
    data: any;
    girdClassName?: string;
    uniqueKey?:string;
}

const breakpoints = {
    '1024': {
        slidesPerView: 5,
    },
    '768': {
        slidesPerView: 2,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};
const CollectionHero: React.FC<Props> = ({   data,
                                             className = 'mb-3 lg:mb-5 ',
                                             girdClassName = '2xl:gap-5',
                                             uniqueKey='hero-grid'
                                         }) => {
    const {width} = useWindowSize();
    
    return (
        <div className={className}>
          
            {width! < 850 ? (
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                >
                    {data?.map((item: any) => (
                        <SwiperSlide
                            key={`collection-key-${item.id}`}
                        >
                            <CollectionHeroCard
                                key={item.id}
                                collection={item}
                                variant={"hero"}
                            />
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className={`grid gap-4 2xl:gap-5 3xl:gap-7 grid-cols-2 ${girdClassName}`}>
                    {data?.map((item: any) => (
                        <CollectionHeroCard
                            key={item.id}
                            collection={item}
                            variant={"hero"}
                        />
                    ))}
                </div>
            )}
        
        </div>
    );
};

export default CollectionHero;
