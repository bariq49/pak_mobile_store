import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeFourGridHero as gridHero,
    homeFourGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeSixHeroSlider as heroSlider} from "@/components/hero/data";

import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import ServicesHome4 from "@/components/common/services-home4";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import ListingFashion from "@/components/product/listingtabs/listing-fashion";


export const metadata: Metadata = {
    title: 'Home6'
};


export default async function Page() {
    return (
        <>
            <HeroSliderBlock
                heroBanner={heroSlider}
                showHeroContent={false}
                className={`lg:mb-7 `}
                contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 xs:min-h-[240px] md:min-h-[240px] xl:min-h-[360px] 2xl:min-h-[440px]"
            />
            
            <Container>
                
                <ServicesHome4 variant={"home4"}/>
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-10"
                />
                
                <BestSellerFeed variant={'outBorder'} uniqueKey={'best-sellers4'}/>
               
                <ListingElectronic variant={'outBorder'}/>
                
                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                
                <ListingFashion  variant={'outBorder'}/>
                
                <LatestblogCarousel variant={"home4"}/>
                
            
            </Container>
        </>
    );
}
