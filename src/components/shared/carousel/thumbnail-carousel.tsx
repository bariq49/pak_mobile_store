import {Navigation, Swiper, SwiperOptions, SwiperSlide, Thumbs,} from '@/components/shared/carousel/slider';
import Image from '@/components/shared/image';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import cn from 'classnames';
import {productGalleryPlaceholder} from '@/assets/placeholders';
import ImageLightBox from '@/components/shared/image-lightbox';

import {IoPlay} from "react-icons/io5";
import { GlassMagnifier } from '../image-magnifiers';
import {usePanel} from "@/hooks/use-panel";

interface Props {
    gallery: any[];
    navigation?: boolean;
    thumbnailClassName?: string;
    galleryClassName?: string;
    videoUrl?: string;
    variant?: "default" |"right"| "bottom";
    activeIndex?: number;
}

const swiperParams: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
};

// Function to extract YouTube video ID from URL, including Shorts
const getYouTubeVideoId = (url?: string): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const ThumbnailCarousel: React.FC<Props> = ({
                                                gallery,
                                                variant,
                                                videoUrl,
                                                navigation = false,
                                                thumbnailClassName = 'xl:w-[500px]',
                                                galleryClassName = 'xl:w-[100px]',
                                                activeIndex
                                            }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [showVideo, setShowVideo] = useState(false); // State to toggle video display
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const mainSwiperRef = useRef<any>(null); // Ref to control main Swiper instance
    
    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [isSwiperReady, setIsSwiperReady] = useState(false);
    
    // Reset thumbs swiper when gallery changes
    useEffect(() => {
        if (isSwiperReady && mainSwiper) {
            mainSwiper.update();
            mainSwiper.slideTo(activeIndex ?? 0, 0);
            setShowVideo((activeIndex ?? 0) === 0 && !!videoUrl);
        }
    }, [gallery, videoUrl, activeIndex, isSwiperReady]);
    
    // Handle slide change to stop video
    const handleSlideChange = (swiper: any) => {
        const activeIndex = swiper.activeIndex;
        setShowVideo(activeIndex === 0 && !!videoUrl);
    };
    
    // Handle video thumbnail click
    const handleVideoThumbnailClick = () => {
        if (videoUrl && mainSwiperRef.current?.swiper) {
            setShowVideo(true);
            mainSwiperRef.current.swiper.slideTo(0, 0); // Navigate to first slide (video)
        }
    };
    
    // Render play button overlay for the video thumbnail
    const renderCirclePlay = () => {
        return (
            <div className="absolute z-1 top-0 start-0 group w-full h-full flex justify-center items-center">
                <div
                    className={cn("flex justify-center items-center text-white w-14 h-14 rounded-full ",
                        "bg-black/80")}
                >
                    <IoPlay className={cn("w-6 h-6")}/>
                </div>
            </div>
        );
    };
    
    // Get YouTube video ID
    const videoId = getYouTubeVideoId(videoUrl);
    const { selectedDirection } = usePanel();
    const dir = selectedDirection; // 'ltr' or 'rtl'

    const galleryBreakpoints = useMemo(() => {
        const isBottom = variant === 'bottom';

        return {
            1280: {
                slidesPerView: 5,
                direction: isBottom ? 'horizontal' : 'vertical',
            },
            767: {
                slidesPerView: 4,
                direction: 'horizontal',
            },
            0: {
                slidesPerView: 3,
                direction: 'horizontal',
            },
        } as Record<number, SwiperOptions>;
    }, [variant]);
    
    return (
        <div className={cn(
            "w-full  relative ",
            {" xl:flex-row-reverse": variant ===  "default"},
            {" xl:flex": variant !==  "bottom"}
        )}>
            <ImageLightBox gallery={gallery}/>
            <div
                className={cn(
                    'w-full mb-5 xl:mb-0   overflow-hidden  relative',
                    {" xl:ms-5": variant ===  "default"},
                    {" xl:me-5": variant ===  "right"},
                    thumbnailClassName
                )}
            >
                {/* Navigation elements */}
                {Boolean(navigation) && (
                    <>
                        <div ref={prevRef}
                             className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"></div>
                        <div ref={nextRef}
                             className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"></div>
                    </>
                )}
                
                < Swiper
                    id="productGallery"
                    dir={dir}
                    className={`${dir === 'rtl' ? 'swiper-rtl' : ''}`}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[Navigation, Thumbs]}
                    navigation={
                        navigation
                            ? {
                                prevEl: prevRef.current!,
                                nextEl: nextRef.current!,
                            }
                            : false
                    }
                    observer={true}
                    observeParents={true}
                    onSwiper={(swiperInstance) => {
                        setMainSwiper(swiperInstance);
                        setIsSwiperReady(true);
                    }}
                    onSlideChange={handleSlideChange}
                    {...swiperParams}
                >
                    {gallery?.map((item: any, index: number) => (
                        <SwiperSlide
                            key={`product-gallery-${item.id || index}`}
                            className="text-center"
                        >
                            {index === 0 && showVideo && videoUrl && videoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                                    title={`YouTube video ${item.id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={cn("mx-auto  w-full ",
                                        {" h-[380px] md:h-[530px]": variant ===  "bottom"},
                                        {" h-[380px] md:h-[590px]": variant !==  "bottom"}
                                    )}
                                />
                            ) : (
                                <div className=" mx-auto magnifier-image-container" style={{
                                    maxWidth: `${variant==='bottom' ? '530px' : '650px'}`,
                                }}>
                                    <GlassMagnifier
                                        src={item.original ?? productGalleryPlaceholder}
                                        alt={`Product gallery ${item.id || index}`}
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* End of product main slider */}
            
            <div className={cn(
                `shrink-0 `,
                {[`${galleryClassName}`] : variant !==  "bottom"},
                {[`mt-5 m-auto lg:max-w-2/3`] : variant ===  "bottom"}
            )}>
                <Swiper
                    id="productGalleryThumbs"
                    key={gallery.length}
                    dir={dir}
                    className={`${dir === 'rtl' ? 'swiper-rtl' : ''}`}
                    onSwiper={(swiper) => {
                        if (swiper && !swiper.destroyed) {
                            setThumbsSwiper(swiper);
                        }
                    }}
                    spaceBetween={10}
                    watchSlidesProgress={true}
                    freeMode={true}
                    observer={true}
                    observeParents={true}
                    breakpoints={galleryBreakpoints}
                    modules={[Thumbs]}
                >
                    {gallery?.map((item: any, index: number) => {
                        const isFirstItem = index === 0;
                        return (
                            <SwiperSlide
                                key={`product-thumb-gallery-${item.id || index}`}
                                className="cursor-pointer rounded overflow-hidden border transition hover:opacity-75 border-border-base box-border"
                                onClick={
                                    isFirstItem && videoUrl
                                        ? handleVideoThumbnailClick
                                        : () => setShowVideo(false)
                                }
                                aria-label={isFirstItem && videoUrl ? "Play YouTube video" : `View product image ${item.id || index}`}
                            >
                                <Image
                                    src={item?.thumbnail ?? productGalleryPlaceholder}
                                    alt={`Product thumb gallery ${item.id || index}`}
                                    width={150}
                                    height={150}
                                />
                                {isFirstItem && videoUrl && renderCirclePlay()}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default ThumbnailCarousel;
