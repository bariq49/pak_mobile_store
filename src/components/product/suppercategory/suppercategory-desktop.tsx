'use client';
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-container";
import React from "react";
import {usePopularProductsQuery} from "@/services/product/get-all-popular-products";
import cn from "classnames";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
    showBanner?: boolean;
}


const SuppercategoryDesktop: React.FC<CategoriesProps> = ({ className = '', rowCarousel = 1,  showBanner = true,}) => {
    const category = {
        "name": "Laptop & Computer",
        "slug": "laptop-computer",
    };
    const {data: products, isLoading} = usePopularProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    
    return (
        <div className={cn("mb-8 lg:mb-15", className)}>
            <SupperCategoryList className={`supper-category--list`} data={category}/>
            <div className="xl:flex w-full gap-1.5">
                
                <div className={`${showBanner ? 'banner-main-content' : 'popular-main-content'} grow`}>
                    <SupperCategoryContainer uniqueKey={'supper-desktop'} data={products} isLoading={isLoading}
                                             rowCarousel={rowCarousel} showBanner={showBanner}/>
                </div>
            </div>
        </div>
    );
}
export default SuppercategoryDesktop;
