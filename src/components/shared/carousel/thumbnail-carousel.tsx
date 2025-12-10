import {
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  Thumbs,
} from "@/components/shared/carousel/slider";
import Image from "@/components/shared/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { productGalleryPlaceholder } from "@/assets/placeholders";
import ImageLightBox from "@/components/shared/image-lightbox";

import { GlassMagnifier } from "../image-magnifiers";
import { usePanel } from "@/hooks/use-panel";

interface Props {
  gallery: any[];
  navigation?: boolean;
  thumbnailClassName?: string;
  galleryClassName?: string;
  variant?: "default" | "right" | "bottom";
  activeIndex?: number;
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  variant,
  navigation = false,
  thumbnailClassName = "xl:w-[500px]",
  galleryClassName = "xl:w-[100px]",
  activeIndex,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Reset thumbs swiper when gallery changes
  useEffect(() => {
    if (isSwiperReady && mainSwiper) {
      mainSwiper.update();
      mainSwiper.slideTo(activeIndex ?? 0, 0);
    }
  }, [gallery, activeIndex, isSwiperReady]);

  const { selectedDirection } = usePanel();
  const dir = selectedDirection; // 'ltr' or 'rtl'

  const galleryBreakpoints = useMemo(() => {
    const isBottom = variant === "bottom";

    return {
      1280: {
        slidesPerView: 5,
        direction: isBottom ? "horizontal" : "vertical",
      },
      767: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      0: {
        slidesPerView: 3,
        direction: "horizontal",
      },
    } as Record<number, SwiperOptions>;
  }, [variant]);

  return (
    <div
      className={cn(
        "w-full  relative ",
        { " xl:flex-row-reverse": variant === "default" },
        { " xl:flex": variant !== "bottom" }
      )}
    >
      <ImageLightBox gallery={gallery} />
      <div
        className={cn(
          "w-full mb-5 xl:mb-0   overflow-hidden  relative",
          { " xl:ms-5": variant === "default" },
          { " xl:me-5": variant === "right" },
          thumbnailClassName
        )}
      >
        {/* Navigation elements */}
        {Boolean(navigation) && (
          <>
            <div
              ref={prevRef}
              className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
            ></div>
            <div
              ref={nextRef}
              className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
            ></div>
          </>
        )}

        <Swiper
          id="productGallery"
          dir={dir}
          className={`${dir === "rtl" ? "swiper-rtl" : ""}`}
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
          {...swiperParams}
        >
          {gallery?.map((item: any, index: number) => (
            <SwiperSlide
              key={`product-gallery-${item.id || index}`}
              className="text-center"
            >
              <div
                className=" mx-auto magnifier-image-container"
                style={{
                  maxWidth: `${variant === "bottom" ? "530px" : "650px"}`,
                }}
              >
                <GlassMagnifier
                  src={item.original ?? productGalleryPlaceholder}
                  alt={`Product gallery ${item.id || index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* End of product main slider */}

      <div
        className={cn(
          `shrink-0 `,
          { [`${galleryClassName}`]: variant !== "bottom" },
          { [`mt-5 m-auto lg:max-w-2/3`]: variant === "bottom" }
        )}
      >
        <Swiper
          id="productGalleryThumbs"
          key={gallery.length}
          dir={dir}
          className={`${dir === "rtl" ? "swiper-rtl" : ""}`}
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
          {gallery?.map((item: any, index: number) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id || index}`}
              className="cursor-pointer rounded overflow-hidden border transition hover:opacity-75 border-border-base box-content"
            >
              <Image
                src={item?.thumbnail ?? productGalleryPlaceholder}
                alt={`Product thumb gallery ${item.id || index}`}
                width={150}
                height={150}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
