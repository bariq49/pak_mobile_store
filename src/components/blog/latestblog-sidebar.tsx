"use client";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import { ROUTES } from "@/utils/routes";
import { useBlogsQuery } from "@/services/blog/get-all-blogs";
import React from "react";
import cn from "classnames";
import LatestblogCard from "@/components/blog/latestblog-card";
import SectionHeader from "@/components/common/section-header";
import Loading from "../shared/loading";

interface Props {
  className?: string;
  variant?: string;
  uniqueKey?: string;
}
const breakpoints = {
  "1024": {
    slidesPerView: 1,
  },
  "768": {
    slidesPerView: 2,
  },
  "540": {
    slidesPerView: 1,
  },
  "0": {
    slidesPerView: 1,
  },
};
const LatestblogSidebar: React.FC<Props> = ({
  className = "relative mb-8",
  variant = "default",
  uniqueKey = "vertical",
}) => {
  const { data: dataBlog, isLoading } = useBlogsQuery();
  const limit = 3;

  return (
    <div className={cn(" ", className)}>
      <SectionHeader
        sectionHeading={'From The <span class="font-light"> Blog</span>'}
        className={cn("mb-5 md:mb-6", {
          "block-title": variant === "default",
        })}
      />

      {isLoading ? (
        <Loading />
      ) : dataBlog && dataBlog.length > 0 ? (
        <Carousel
          breakpoints={breakpoints}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          prevActivateId={`prev${uniqueKey}`}
          nextActivateId={`next${uniqueKey}`}
        >
          {dataBlog.slice(0, limit).map((item) => (
            <SwiperSlide key={`collection-key-${item.id}`}>
              <LatestblogCard
                variant={variant}
                key={item.id}
                collection={item}
                href={`${ROUTES.BLOG}/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="flex justify-center items-center bg-white rounded py-5">
          <p className="text-brand-dark">No Blogs available</p>
        </div>
      )}
    </div>
  );
};

export default LatestblogSidebar;
