
import {Metadata} from 'next';

import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";

import {
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
    homeThreeHeroCarousel as bannerHeroCarousel,
} from "@/components/banner/data";
import { homeThreeHeroSlider as heroSlider} from "@/components/hero/data";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";
import ServiceFeature from "@/components/common/service-featured";
import BrandCarousel from "@/components/brand/brand-carousel";
import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import ListingFashion from "@/components/product/listingtabs/listing-fashion";

export const metadata: Metadata = {
    title: 'Home3',
};

export default async function Page() {
    return (
        <>
            <Container variant={'Large'}>
                <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
                    <HeroSliderBlock
                        heroBanner={heroSlider}
                        showHeroContent={false}
                        className={`lg:mb-7 `}
                        contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 xs:min-h-[150px] md:min-h-[320px] xl:min-h-[380px] 2xl:min-h-[448px]"
                    />
                    <BannerGrid
                        data={bannerHeroCarousel}
                        grid={1}
                        className="mb-7 staticBanner--slider"
                        girdClassName={"xl:gap-6"}
                    />
                </div>
                    
                    <ServiceFeature/>
                    
                    <BestSellerFeed/>
                    
                    <BannerGrid
                        data={gridHero}
                        grid={2}
                        girdClassName={"xl:gap-5 "}
                        className=" mb-8 lg:mb-12"
                    />
                
                    <ListingElectronic variant={'large'}/>
                    
                    <BannerGrid
                        data={gridHero2}
                        grid={2}
                        className=" mb-8 lg:mb-12"
                        girdClassName="xl:gap-5 2xl:grid-cols-[minmax(1140px,_1fr)_1fr] "
                    />
                
                    <ListingFashion variant={'large'}/>
                    
                    <GridBaseCarousel/>
                    
                    <BrandCarousel/>
            </Container>
        
        </>
);
}
