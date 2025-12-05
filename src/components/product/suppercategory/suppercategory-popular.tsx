'use client';
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-popular-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-popular-container";
import {useElectronicCategoryQuery} from '@/services/product/get-electronic-category';

import React from "react";
import cn from "classnames";
import SectionHeader from "@/components/common/section-header";
import {homeFivePopularCategories as bannerHeroCategoies} from "@/components/banner/data";
import BannerGrid from "@/components/banner/banner-grid";
import {useElectronicProductsQuery} from "@/services/product/get-all-electronic-products";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
    showBanner?: boolean;
}

const SuppercategoryPopular: React.FC<CategoriesProps> = ({className = '', rowCarousel = 1, showBanner}) => {
    const {data: category} = useElectronicCategoryQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    const {data: products, isLoading} = useElectronicProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    
    return (
        <div className={cn("mb-8 lg:mb-12", className)}>
            <SectionHeader
                sectionHeading={"Popular Categories <span class=\"font-light\">This Month</span>"}
                className="mb-3"
            />
            <div className="xl:flex border border-black/10 rounded bg-white w-full">
                <div className={`xl:w-[300px] p-5 `}>
                    <SupperCategoryList className={`categoryPopular--list`} data={category} showBanner={showBanner}/>
                </div>
                
                {showBanner && (
                    <BannerGrid
                        data={bannerHeroCategoies}
                        grid={1}
                        className="hidden xl:flex staticBanner--slider py-6"
                    />
                )}
                
                <div className={`${showBanner ? 'banner-main-content' : 'popular-main-content'} md:p-2.5 grow`}>
                    <SupperCategoryContainer uniqueKey={'supper-popular'} data={products} isLoading={isLoading}
                                             showBanner={showBanner} rowCarousel={rowCarousel}/>
                </div>
            
            </div>
        </div>
    );
}
export default SuppercategoryPopular;
