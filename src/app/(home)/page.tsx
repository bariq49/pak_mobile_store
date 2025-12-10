import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import NewSidebarFeed from "@/components/product/feeds/new-sidebar-feed";
import { homeThreeHeroCarousel as bannerHeroCarousel } from "@/components/banner/data";
import ServiceFeature from "@/components/common/service-featured";
import ListingCategory from "@/components/product/listingtabs/listing-category";
import SaleProductsFeed from "@/components/product/feeds/on-sales-feed";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  return (
    <>
      <Container variant={"Large"}>
        <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
          <HeroSliderBlock />
          <BannerGrid
            data={bannerHeroCarousel}
            grid={1}
            className="mb-7 staticBanner--slider"
            girdClassName={"xl:gap-6"}
          />
        </div>
        <ServiceFeature />
      </Container>

      <Container variant={"Large"}>
        <div className="grid grid-cols-12 gap-4 xl:gap-8">
          <div className="maincontent-right col-span-12 order-1 lg:order-2 lg:col-span-9 2xl:col-span-10">
            <SaleProductsFeed />
            <ListingCategory />
          </div>

          {/* Sidebar */}
          <div className="maincontent-left col-span-12 order-2 lg:order-1 lg:col-span-3 2xl:col-span-2">
            <BestSidebarFeed />
            <NewSidebarFeed className="mb-0" />
          </div>
        </div>
      </Container>
    </>
  );
}
