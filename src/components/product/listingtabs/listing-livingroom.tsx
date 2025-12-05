"use client";
import ListingTabs from "@/components/product/listingtabs/listing-ui-furni/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui-furni/product-listing";
import Loading from "@/components/shared/loading";
import {useTrendingProductsQuery} from "@/services/product/get-all-trending-products";
import {useListingTabs} from "@/hooks/use-listing-tabs";

 interface Props {
     variant?: string;
};

const categories = {
    "name": "Living room",
    "slug": "living-room",
    "children": [
        {
            "id": 1,
            "name": "Sofas & couches",
            "slug": "sofas"
        },
        {
            "id": 2,
            "name": "Coffee tables",
            "slug": "coffee"
        },
        {
            "id": 3,
            "name": "Futons",
            "slug": "futons"
        },
        {
            "id": 4,
            "name": "Home & Kitchen",
            "slug": "kitchen"
        },
        {
            "id": 5,
            "name": "Lighting & Lamps",
            "slug": "lighting"
        },
    
    ]
};


const ListingLivingroom: React.FC<Props> = ({variant='default'}) => {
    const { activeTab, isPending, handleTabClick } = useListingTabs();

    const {data: products,isLoading } = useTrendingProductsQuery({});
    
    return (
        <div className="mb-8 lg:mb-12 navTopSlider">
            <ListingTabs variant={variant} data={categories} onNavClick={handleTabClick} activeTab={activeTab}/>
            <div>
                {
                    isPending ? <Loading/>
                    : (
                        <ProductListing  data={products} isLoading={isLoading} variant={variant} uniqueKey={'electronic'} />
                    )}
            </div>
           
        </div>
    );
}
export default ListingLivingroom;
