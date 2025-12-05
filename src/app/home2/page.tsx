import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeTwoHeroCarousel as bannerSlider,
    homeTwoGridHero as gridHero,
    homeTwoGridHero2 as gridHero2,
    homeTwoSidebar as heroSidebar,
} from "@/components/banner/data";
import { homeTwoHeroSlider as heroSlider} from "@/components/hero/data";
import ServiceFeature from '@/components/common/service-featured';

import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import LatestblogSidebar from "@/components/blog/latestblog-sidebar";
import NewSidebarFeed from "@/components/product/feeds/new-sidebar-feed";
import Testimonial from "@/components/collection/testimonial";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import BrandCarousel from "@/components/brand/brand-carousel";
import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import ListingFashion from "@/components/product/listingtabs/listing-fashion";

export const metadata: Metadata = {
    title: 'Home2'
};


export default async function Page() {
    return (
        <>
            <Container variant={'Large'}>
                <div className={"grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(72%,_1fr)_1fr] xl:grid-cols-[minmax(72%,_1fr)_1fr] 2xl:ps-[19.5rem]"}>
                    <HeroSliderBlock
                        heroBanner={heroSlider}
                        showHeroContent={false}
                        className={`lg:mb-7 mt-6`}
                        contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[320px]  xl:min-h-[520px] 2xl:min-h-[550px] "
                    />
                    <BannerGrid
                        data={bannerSlider}
                        grid={1}
                        girdClassName={"gap-2.5 xl:gap-5"}
                        className=" mb-7 mt-3 lg:mt-6  staticBanner--slider"
                    />
                </div>
                <ServiceFeature/>
                
            </Container>
            
            <Container variant={'Large'}>
                <div className="grid grid-cols-12 gap-4 xl:gap-8">
                    <div className="maincontent-left col-span-12 lg:col-span-3 2xl:col-span-2">
                        <BannerGrid
                            data={heroSidebar}
                            grid={1}
                            className="relative mb-8 lg:mb-10"
                        />
                        <BestSidebarFeed/>
                        <LatestblogSidebar/>
                        <NewSidebarFeed/>
                        <Testimonial />
                    </div>
                    <div className="maincontent-right col-span-12  lg:col-span-9 2xl:col-span-10">
                        <BestDealsFeed/>
                        
                        <ListingElectronic  />
                        
                        <BannerGrid
                            data={gridHero}
                            grid={2}
                            className="mb-8 lg:mb-10"
                        />
                        
                        <ListingFashion  />
                        
                        <BannerGrid
                            data={gridHero2}
                            grid={2}
                            className="mb-8 "
                            girdClassName="xl:gap-6 xl:grid-cols-[minmax(654px,_1fr)_1fr] 2xl:grid-cols-[minmax(935px,_1fr)_1fr] "
                        />
                        
                        <GridBaseCarousel/>
                        
                        <BrandCarousel/>
                      
                    </div>
                </div>
                
            </Container>
        </>
);
}
