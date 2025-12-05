'use client';
import cn from 'classnames';
import {ROUTES} from "@/utils/routes";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import {SwiperSlide} from '@/components/shared/carousel/slider';

import FeaturedCard from '@/components/cards/featured-card';
import Carousel from '@/components/shared/carousel/carousel';
import CardIcon from "@/components/icons/featured/card-icon";
import SupportIcon from "@/components/icons/featured/support-icon";
import FeedbackIcon from "@/components/icons/featured/feedback-icon";
import LicenseIcon from "@/components/icons/featured/license-icon";
import DeliveryIcon from "@/components/icons/featured/delivery-icon";



interface Props {
    className?: string;
    variant?: string;
    uniqueKey?:string;
}

const breakpoints = {
    '1536': {
        slidesPerView: 5,
    },
    '1280': {
        slidesPerView: 4,
    },
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 2,
    },
    '640 ': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const ServicesHome4: React.FC<Props> = ({ className = 'mb-8 lg:mb-10 ',variant ,uniqueKey='services4',}) => {
    const { selectedColor } = usePanel();
    const data = [
        {
            id: 1,
            icon: (
                <DeliveryIcon color={colorMap[selectedColor].link}/>
            ),
            title: 'Fast Delivery',
            description: 'Deliver in 24 hours max!',
            href: ROUTES.HOME,
        },
        {
            id: 2,
            icon: (
                <CardIcon color={colorMap[selectedColor].link} />
            ),
            title: 'Safe payment',
            description: '100% secure payment',
            href: ROUTES.HOME,
        },
        {
            id: 3,
            icon: (
                <FeedbackIcon color={colorMap[selectedColor].link} />
            ),
            title: 'Online Discount',
            description: 'Add multi-buy discount',
            href: ROUTES.HOME,
        },
        {
            id: 4,
            icon: (
                <SupportIcon color={colorMap[selectedColor].link} />
            ),
            title: 'Help Center',
            description: 'Dedicated 24/7 support',
            href: ROUTES.HOME,
        },
        {
            id: 5,
            icon: (
                <LicenseIcon color={colorMap[selectedColor].link} />
            ),
            title: 'Curated items',
            description: 'From handpicked sellers',
            href: ROUTES.HOME,
        }
    ];
    
    return (
        <div className={cn(
            'group',{
                'bg-white rounded-md border border-black/10 py-6':  variant === 'home4' ,
                'bg-white  py-6':  variant === 'home8' ,
            },
            className
        )}
        >
            <Carousel
                spaceBetween={0}
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
            >
                {data?.map((item) => (
                    <SwiperSlide key={`featured-key-${item.id}`}>
                        <FeaturedCard item={item} variant={variant} />
                    </SwiperSlide>
                ))}

            </Carousel>
        </div>
    );
};
export default ServicesHome4;
