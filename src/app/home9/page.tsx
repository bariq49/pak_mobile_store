import {Metadata} from 'next';
import Container from '@/components/shared/container';
import BannerGrid from "@/components/banner/banner-grid";

import {
    homeNineGridHero as gridHero,
} from "@/components/banner/data";

import {
    homeNineHeroCarousel2 as heroSlider2,
    homeNineHeroCarousel as heroSlider
} from "@/components/hero/data";

import ListingBedroom from "@/components/product/listingtabs/listing-bedroom";
import ListingLivingroom from "@/components/product/listingtabs/listing-livingroom";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import BrandCarousel from "@/components/brand/brand-carousel";
import CollectionHero from "@/components/collection/collection-hero";

export const metadata: Metadata = {
    title: 'Home9'
};


export default async function Page() {
    return (
        <>
            <Container>
                <CollectionHero
                    data={heroSlider}
                    className="mb-5  staticBannerHero"
                    uniqueKey={"hero1"}
                    girdClassName={"xs:gap-5 lg:grid-cols-[minmax(780px,_1fr)_1fr_1fr]"}
                />
                
                <CollectionHero
                    data={heroSlider2}
                    className="mb-8 lg:mb-12 staticBannerHero"
                    uniqueKey={"hero2"}
                    girdClassName={"xs:gap-5 lg:grid-cols-[1fr_minmax(780px,_1fr)_1fr]"}
                />
                
                <ListingLivingroom variant={'furniture'}  />
                
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />
                <ListingBedroom  variant={'furniture'}/>
                
                <LatestblogCarousel variant={'furniture'} className="mb-8 lg:mb-12 navTopSlider"/>
                
                <BrandCarousel />
                
            </Container>
            
          
        </>
    );
}
