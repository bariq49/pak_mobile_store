"use client";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";
import Loading from "@/components/shared/loading";
import cn from "classnames";
import {usefashionProductsQuery} from "@/services/product/get-all-fashion-products";
import {useListingTabs} from "@/hooks/use-listing-tabs";
import ListingBanner from "@/components/product/listingtabs/listing-ui/listingBanner";

 interface Props {
     variant?: string| undefined;
     showBanner?: string;
};

const categories = {
    "name": "Laptop & Computer",
    "slug": "laptop-computer",
    "children": [
        {
            "id": 1,
            "name": "Apple",
            "slug": "apple"
        },
        {
            "id": 2,
            "name": "Laptop Acer",
            "slug": "acer"
        },
        {
            "id": 3,
            "name": "Laptop Asus",
            "slug": "assus"
        },
        {
            "id": 4,
            "name": "Laptop Dell",
            "slug": "dell"
        },
        {
            "id": 5,
            "name": "Laptop HP",
            "slug": "hp"
        },
    
    ]
};


const ListingComputer: React.FC<Props> = ({variant='default',showBanner}) => {
    const { activeTab, isPending, handleTabClick } = useListingTabs();
    const {data: products,isLoading} = usefashionProductsQuery({});
    const bannerUrl = '/assets/images/collection/banner_cate_home7_2.jpg';

    return (
        <div className="mb-8 lg:mb-12 ">
            <ListingTabs variant={variant} data={categories} onNavClick={handleTabClick} activeTab={activeTab}/>
            <div className={cn({
                ['xl:flex border border-black/10 rounded bg-white']: variant === "outBorder",
                ['flex-row-reverse']: showBanner === "right"
            })}>
                {showBanner && (
                    <ListingBanner
                        slug={categories.slug}
                        name={categories.name}
                        bannerUrl={bannerUrl}
                    />
                )}
                <div className={`${showBanner?'banner-listing-content md:p-2.5':'w-full md:p-2.5'}`} >
                    {isPending ? <Loading/>
                        : (
                            <ProductListing  data={products} isLoading={isLoading} variant={variant} uniqueKey={'computer'} />
                        )}
                </div>
           
            </div>
        </div>
    );
}
export default ListingComputer;
