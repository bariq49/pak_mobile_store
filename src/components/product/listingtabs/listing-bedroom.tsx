"use client";
import ListingTabs from "@/components/product/listingtabs/listing-ui-furni/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui-furni/product-listing";
import { useState, useTransition } from 'react';
import Loading from "@/components/shared/loading";
import {useTopSellProductsQuery} from "@/services/product/get-all-topsell-produts";


interface Props {
    variant?: string;
};

const categories = {
    "name": "Bedroom essentials",
    "slug": "bedroom",
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

const ListingBedroom: React.FC<Props> = ({variant='default'}) => {
    const [activeTab, setActiveTab] = useState(1);
    const [isPending, startTransition] = useTransition();
    
    const {
        data: products,
        isLoading,
    } = useTopSellProductsQuery({});
    
    
    const handleTabClick = (category: number) => {
        startTransition(() => {
            setActiveTab(category);
        });
    };
    
    return (
        <div className="mb-8 lg:mb-12 navTopSlider">
            <ListingTabs variant={variant} data={categories} onNavClick={handleTabClick} activeTab={activeTab}/>
            <div>
                {isPending ? <Loading/>
                    : (
                        <ProductListing  data={products} isLoading={isLoading} variant={variant} uniqueKey={'fashion'} />
                    )}
            </div>
        
        </div>
    );
}
export default ListingBedroom;
