import React, {useRef, useState} from "react";
import { useSessionStorage } from 'react-use';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation,  Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from "swiper"; // Import Swiper type for TypeScript
import 'swiper/css/autoplay';
import {IoIosArrowBack, IoIosArrowForward,IoIosPlay,IoIosPause} from "react-icons/io";
import Link from "@/components/shared/link";
import HighlightedBar from "@/components/shared/highlighted-bar";

const RenderedHighLightedBar: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isPlaying, setIsPlaying] = useState(true); // Track autoplay status

    const handlePause = () => {
        swiperRef.current?.autoplay?.stop();
        setIsPlaying(false);
    };

    const handlePlay = () => {
        swiperRef.current?.autoplay?.start();
        setIsPlaying(true);
    };
    const [highlightedBar, setHighlightedBar] = useSessionStorage(
        'highlightedBar',
        'false'
    );
    const HighLightedBarItems  = [
        {id: 1, title: "Updates to Razor Digital Service Terms of Use and Privacy Policy ", href:"/"},
        {id: 2, title: "Welcome to Razor Join us for 5% off & free delivery ", href:"/"},
        {id: 3, title: "Claim your online FREE Delivery or Shipping today", href:"/"},
    ];

    return (
        <>
          {highlightedBar !== 'true' && (
            <HighlightedBar  onClose={() => setHighlightedBar('true')}>
                <Swiper
                    onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
                    modules={[Navigation,Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000 }} // Configure autoplay delay
                    navigation={false} // Disable default navigation arrows
                >
                    {HighLightedBarItems.map((item, idx: number) => (
                        <SwiperSlide key={`highlightedBar--key-${idx}`}>
                            <div className="text-center text-base text-brand-light text-sm">
                                {item.title}
                                <Link className="notification-banner__link underline ml-2 hover:text-blue-500" href="{item.href}" >Learn More</Link>
                            </div>
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
                
                {/* Custom Arrows */}
                <div className="hidden lg:block c-carousel-controls end-0 absolute top-1/2 -translate-y-1/2 me-12  " >
                    <div className="bg-black/20 flex rtl:flex-row-reverse items-center justify-center gap-1 text-brand-light p-1 rounded-full">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className={"w-5 h-5 flex items-center justify-center cursor-pointer"}
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            onClick={isPlaying ? handlePause : handlePlay}
                            className={"w-5 h-5 flex items-center justify-center cursor-pointer"}
                        >
                            {isPlaying ? <IoIosPause />: <IoIosPlay />}
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className={"w-5 h-5 flex items-center justify-center cursor-pointer"}
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>

                </div>
            </HighlightedBar>
          )}
        </>
    );
}
export default RenderedHighLightedBar;
