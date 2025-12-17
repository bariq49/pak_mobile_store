import Container from "@/components/shared/container";
import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import NewSidebarFeed from "@/components/product/feeds/new-sidebar-feed";
import ListingCategory from "@/components/product/listingtabs/listing-category";
import SaleProductsFeed from "@/components/product/feeds/on-sales-feed";
import HomeHeroWithDeals from "@/components/home/home-hero-with-deals";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  return (
    <>
      <HomeHeroWithDeals />

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
