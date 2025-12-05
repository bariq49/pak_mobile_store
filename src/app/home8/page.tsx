import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeEightGridHero as gridHero,
} from "@/components/banner/data";
import {homeEightHeroSlider as heroSlider} from "@/components/hero/data";

import ServicesHome4 from "@/components/common/services-home4";
import BestSellerFuniFeed from "@/components/product/feeds/best-seller-funi-feed";
import CollectionGrid from "@/components/collection/collection-grid";
import ListingLivingroom from "@/components/product/listingtabs/listing-livingroom";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import BrandCarousel from "@/components/brand/brand-carousel";

export const metadata: Metadata = {
    title: 'Home8'
};


export default async function Page() {
    return (
        <>
            <HeroSliderBlock
                heroBanner={heroSlider}
                showHeroContent={false}
                contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[270px] xl:min-h-[360px] 2xl:min-h-[550px]"
            />
            <Container>
                <ServicesHome4 variant={"home8"}/>
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-12"
                    girdClassName="xl:gap-5 xl:grid-cols-[1fr_minmax(770px,_1fr)_1fr] "
                />
                
                <BestSellerFuniFeed variant={"furniture"} className={"mb-8 md:mb-10 navTopSlider"}/>
            </Container>
            
            <div className={'bg-zinc-100 dark:bg-gray-100 py-8 sm:py-14 mb-8 lg:mb-12'}>
                <Container>
                    <CollectionGrid  className="mb-0 lg:mb-0"/>
                </Container>
            </div>
            <Container>
                <ListingLivingroom variant={'furniture'}  />
                
                <LatestblogCarousel variant={'furniture'} className="mb-8 lg:mb-12 navTopSlider"/>
                
                <BrandCarousel />
            </Container>
        </>
    );
}
