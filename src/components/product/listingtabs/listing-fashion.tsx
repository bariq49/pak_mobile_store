"use client";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";

import Loading from "@/components/shared/loading";
import {usefashionProductsQuery} from "@/services/product/get-all-fashion-products";
import cn from "classnames";
import {useListingTabs} from "@/hooks/use-listing-tabs";
import ListingBanner from "@/components/product/listingtabs/listing-ui/listingBanner";

 interface Props {
     variant?: string| undefined;
     showBanner?: string;
};
const categories = {
    "name": "Fashion & Clothing",
    "slug": "fashion",
    "children": [
        {
            "id": 1,
            "name": "Accessories",
            "slug": "accessories"
        },
        {
            "id": 2,
            "name": "Book & Office",
            "slug": "digital"
        },
        {
            "id": 3,
            "name": "Lighting & Lamps",
            "slug": "lighting"
        },
        {
            "id": 4,
            "name": "School Uniforms",
            "slug": "uniforms"
        },
        {
            "id": 5,
            "name": "Girls New",
            "slug": "girls"
        },
    
    ]
};
const ListingFashion: React.FC<Props> = ({variant='default', showBanner}) => {
    const { activeTab, isPending, handleTabClick } = useListingTabs();
    const {data: products,isLoading} = usefashionProductsQuery({});
    const bannerUrl = '/assets/images/collection/banner_cate_home7_4.jpg';
    
    return (
        <div className="mb-8 lg:mb-12">
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
                            <ProductListing  data={products} isLoading={isLoading} variant={variant} uniqueKey={'fashion'}/>
                        )}
                </div>
            
            </div>
            
        </div>
    );
}
export default ListingFashion;
