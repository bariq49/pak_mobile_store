import {Metadata} from 'next';
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeFourHeroCarousel as bannerHeroCarousel,
    homeFourGridHero as gridHero,
    homeFourGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeFourHeroSlider as heroSlider} from "@/components/hero/data";
import BrandCarousel from '@/components/brand/brand-carousel';
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import ServicesHome4 from "@/components/common/services-home4";
import CollectionShop from "@/components/collection/collection-shop";
import SuppercategoryPopular from "@/components/product/suppercategory/suppercategory-popular";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";
import NewProductFeed from "@/components/product/feeds/new-product-feed";

export const metadata: Metadata = {
    title: 'Home4'
};


export default async function Page() {
    return (
        <>
            
            <Container>
                <div
                    className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(70%,_1fr)_1fr] 2xl:grid-cols-[minmax(73%,_1fr)_1fr]">
                    <HeroSliderBlock
                        heroBanner={heroSlider}
                        showHeroContent={false}
                        className={`lg:mb-7 `}
                        contentClassName="rounded-md p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 xs:min-h-[150px] md:min-h-[310px] xl:min-h-[410px] 2xl:min-h-[450px]"
                    />
                    <BannerGrid
                        data={bannerHeroCarousel}
                        grid={1}
                        className="mb-7 staticBanner--slider"
                        girdClassName={'xl:gap-5'}
                    />
                </div>
               
                <ServicesHome4 variant={"home4"}/>
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                
                <CollectionShop/>
                
                <SuppercategoryPopular/>
                
                <BestSellerFeed variant={'outBorder'} rowCarousel={2} uniqueKey={'best-sellers4'}/>
                
                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                <NewProductFeed variant={'cardList'} className="mb-8 lg:mb-12"/>
                
                <LatestblogCarousel variant={"home4"}/>
                
                <BrandCarousel variant={"home4"}/>
                
            </Container>
        </>
    );
}
