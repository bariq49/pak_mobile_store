import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";

import {
    homeFourGridHero as gridHero, homeFourGridHero2 as gridHero2,
    homeSevenHeroCarousel as bannerHeroCarousel,
} from "@/components/banner/data";
import {homeSeventHeroSlider as heroSlider} from "@/components/hero/data";

import BannerGrid from "@/components/banner/banner-grid";
import ServicesHome4 from "@/components/common/services-home4";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import ListingFashion from "@/components/product/listingtabs/listing-fashion";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import BrandCarousel from "@/components/brand/brand-carousel";
import ListingCellPhone from "@/components/product/listingtabs/listing-cellphone";
import ListingComputer from "@/components/product/listingtabs/listing-computer";

export const metadata: Metadata = {
    title: 'Home7'
};

export default async function Page() {
    return (
        <>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <HeroSliderBlock
                        heroBanner={heroSlider}
                        showHeroContent={false}
                        className={`lg:mb-7 border border-black/10 border-r-0 rounded-l overflow-hidden `}
                        contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 min-h-[180px] md:min-h-[340px] xl:min-h-[342px] 2xl:min-h-[421px]"
                    />
                    <BannerGrid
                        data={bannerHeroCarousel}
                        grid={2}
                        className="mb-7  staticBanner--slider"
                        girdClassName={'gap-px xl:gap-px border border-black/5 bg-black/5'}
                    />
                </div>
                <ServicesHome4 variant={"home4"}/>
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-10"
                />
                
                <ListingCellPhone variant={'outBorder'} showBanner={'left'}/>
                <ListingComputer  variant={'outBorder'} showBanner={'right'}/>
                
                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                
                <ListingElectronic variant={'outBorder'} showBanner={'left'}/>
                <ListingFashion  variant={'outBorder'} showBanner={'right'}/>
                
                <LatestblogCarousel variant={"home4"}/>
                
                <BrandCarousel variant={"home4"}/>
                
            </Container>
            
        </>
    );
}
