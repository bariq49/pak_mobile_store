"use client";
import { useState, useTransition } from 'react';
import { LIMITS } from '@/services/utils/limits';
import {FC} from "react";
import cn from "classnames";
import { useBestSellerProductsQuery } from '@/services/product/get-all-best-seller-products';
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import {Product} from "@/services/types";
import Loading from '@/components/shared/loading';


type BoxProps = {
    className?: string;
    variant?: string;
};

 // Define the tabs data array with component references
 const tabsData = [
    { id: 'featured', title: 'Featured' },
    { id: 'topTrending', title: 'Top Trending' },
    { id: 'onSale', title: 'On Sale'  },
];

const ListingFeatured: FC<BoxProps> = ({
    className,
    variant,
}) => {
    const { data: products, isLoading } = useBestSellerProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });

    const [activeTab, setActiveTab] = useState(tabsData[0].id); // Set default active tab
    const [isPending, startTransition] = useTransition();

    const handleTabClick = (tabId: string ) => {
        startTransition(() => {
          setActiveTab(tabId);
        });
    };

    // Filter products based on the active tab
    const filteredProducts = () => {
        switch (activeTab) {
            case 'featured':
                return products?.filter(product => product.isFeatured); // Assuming `isFeatured` is a boolean
            case 'topTrending':
                return products?.sort((a: Product , b: Product) => b.rating - a.rating); // Assuming rating filter
            case 'onSale':
                return products?.filter(product => product.discountPercentage > 0); // Assuming discount filter
            default:
                return products;
        }
    };
    
     // Get the active tab data
     const displayProducts = filteredProducts();

    return (
      <div className={cn('my-8 lg:my-12', className)}
      >
        {/* Tabs Navigation */}
        <div className={"flex gap-7 pb-4 tab-products"}>
            {tabsData.map((tab) => (
            <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`${ activeTab === tab.id ? "text-brand-dark" : "text-gray-400"}
                text-base lg:text-[16px] lg:leading-6 font-bold uppercase relative`}
            >
                {tab.title}
            </button>
            ))}
        </div>
        {/* Displaying content based on activeTab */}
        <div className={" gap-7 tab-products"}>
            {isPending ? <Loading/> : (
                <ProductsCarousel
                    products={displayProducts ?? []}
                    loading={isLoading}
                    limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
                    uniqueKey={activeTab}
                    variant={variant}
                    className={className}
                />
            )}
        </div>
        
      </div>
  );
}
export default ListingFeatured;
