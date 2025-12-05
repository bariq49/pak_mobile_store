import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeFourGridHero as gridHero,
    homeFourGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeFiveHeroSlider as heroSlider} from "@/components/hero/data";

import BrandCarousel from '@/components/brand/brand-carousel';
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import ServicesHome4 from "@/components/common/services-home4";
import SuppercategoryPopular from "@/components/product/suppercategory/suppercategory-popular";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";


export const metadata: Metadata = {
    title: 'Home5'
};


export default async function Page() {
    return (
        <>
            <Container>
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={false}
                    className={`mb-7 2xl:ms-80`}
                    contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 xs:min-h-[120px] md:min-h-[250px] xl:min-h-[438px] 2xl:min-h-[438px]"
                />
                
                <ServicesHome4 variant={"home4"}/>
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-10"
                />
                
                <SuppercategoryPopular rowCarousel={2} showBanner={true}/>
                
                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                
                <BestSellerFeed variant={'outBorder'} uniqueKey={'best-sellers4'}/>
                
                <LatestblogCarousel variant={"home4"}/>
                
                <BrandCarousel variant={"home4"}/>
            
            </Container>
        </>
    );
}
