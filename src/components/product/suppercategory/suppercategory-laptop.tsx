'use client';
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-container";
import React from "react";
import {usefashionProductsQuery} from "@/services/product/get-all-fashion-products";
import cn from "classnames";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
    showBanner?: boolean;
    showCategoryList?: boolean;
}


const SuppercategoryLaptop: React.FC<CategoriesProps> = ({className = '', rowCarousel = 1,  showBanner = true}) => {
    const category = {
        "name": "Laptop & MacBook",
        "slug": "laptop-macBook",
    };
    const {data: products, isLoading} = usefashionProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    
    return (
        <div className={cn("mb-8 lg:mb-15",className)}>
            <SupperCategoryList className={`supper-category--list`} data={category} />
            <div className="xl:flex w-full gap-1.5">
               
                <div className={`${showBanner ? 'banner-main-content' : 'popular-main-content'} grow`}>
                    <SupperCategoryContainer uniqueKey={'supper-laptop'}  data={products} isLoading={isLoading}
                                             rowCarousel={rowCarousel} showBanner={showBanner}/>
                </div>
            </div>
        </div>
    );
}
export default SuppercategoryLaptop;
