
import {Metadata} from 'next';

import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";

import {
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeHeroSlider as heroSlider} from "@/components/hero/data";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";
import ServiceFeature from "@/components/common/service-featured";
import SuppercategoryElectronic from "@/components/product/suppercategory/suppercategory-electronic";
import BrandCarousel from "@/components/brand/brand-carousel";
import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import SuppercategoryCloth from "@/components/product/suppercategory/suppercategory-cloth";

export const metadata: Metadata = {
    title: 'Electronics Store ReactJS Template',
    description: 'Multipurpose E-commerce template built with React, NextJS, TypeScript and Tailwind CSS.',
};

export default async function Page() {
    return (
        <>
            <Container variant={'Large'}>
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={true}
                />
                <ServiceFeature/>
                
                <BestSellerFeed/>
                
                <BannerGrid
                    data={gridHero}
                    grid={2}
                    girdClassName={"xl:gap-5 "}
                    className=" mb-8 lg:mb-12"
                />
                
                <SuppercategoryElectronic />
                
                <BannerGrid
                    data={gridHero2}
                    grid={2}
                    className=" mb-8 lg:mb-12"
                    girdClassName="xl:gap-5 2xl:grid-cols-[minmax(1140px,_1fr)_1fr] "
                />
                
                <SuppercategoryCloth />
                
                <GridBaseCarousel/>
                
                <BrandCarousel/>
            </Container>
            
        </>
);
}
