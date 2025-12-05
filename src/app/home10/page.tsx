import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import {
    homeNineGridHero as gridHero,
} from "@/components/banner/data";
import {homeTenHeroSlider as heroSlider} from "@/components/hero/data";
import BannerGrid from "@/components/banner/banner-grid";
import BestSellerFuniFeed from "@/components/product/feeds/best-seller-funi-feed";
import CollectionFeatured from "@/components/collection/collection-featured";
import TopSellerFuniFeed from "@/components/product/feeds/top-seller-funi-feed";
import BannerBackground from "@/components/banner/banner-background";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";


export const metadata: Metadata = {
    title: 'Home10'
};


export default async function Page() {
    return (
        <>
            <HeroSliderBlock
                heroBanner={heroSlider}
                showHeroContent={false}
                className="mb-5"
                contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[400px] xl:min-h-[560px] 2xl:min-h-[750px]"
            />
            <BannerGrid
                data={gridHero}
                grid={3}
                className="mb-12 lg:mb-20 mx-4"
            />
            
            <Container>
                <BestSellerFuniFeed variant={"furniture2"} rowCarousel={2} className={"mb-12 lg:mb-20 "}/>
            </Container>
            
            <CollectionFeatured/>
            
            <Container>
                <TopSellerFuniFeed variant={"furniture2"}  className={"mb-12 lg:mb-20 "}/>
            </Container>
            
            <BannerBackground/>
            
            <Container>
                <LatestblogCarousel variant={'furniture2'} className="mb-12 lg:mb-20 "/>
            </Container>
        </>
    );
}
