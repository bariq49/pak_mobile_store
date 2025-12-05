"use client";
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-container";
import React from "react";
import cn from "classnames";
import Image from '@/components/shared/image';
import {useElectronicProductsQuery} from "@/services/product/get-all-electronic-products";
import {usePanel} from "@/hooks/use-panel";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
    showBanner?: boolean;
    showCategoryList?: boolean;
}

const categories = {
    "name": "Electronic & Digital",
    "slug": "electronic",
    "children": [
        {
            "id": 1,
            "name": "Bags & Accessories",
            "slug": "accessories"
        },
        {
            "id": 2,
            "name": "Electronic & Digital",
            "slug": "digital"
        },
        {
            "id": 3,
            "name": "Garden & Kitchen",
            "slug": "garden"
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

const SuppercategoryElectronic: React.FC<CategoriesProps> = ({ className = '', rowCarousel = 1,  showBanner = true}) => {
    
    const {data: products, isLoading} = useElectronicProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    const { selectedDirection } = usePanel();
    const dir = selectedDirection;
    const backgroundThumbnail =
        dir === 'ltr'
            ? '/assets/images/collection/cate_1.jpg'
            : '/assets/images/collection/cate_1_rtl.jpg';
    return (
        <div className={cn("mb-8 lg:mb-12", className)}>
            <div className="xl:flex border border-black/10 rounded-md overflow-hidden">
                <div className={`xl:w-[420px] p-7 relative min-h-[355px] overflow-hidden rounded-md`}>
                    <div className={'absolute inset-0 '}>
                        <Image
                            src={backgroundThumbnail}
                            alt={'Product Image'}
                            width={419}
                            height={365}
                            className="object-cover"
                        />
                    </div>
                    
                    <SupperCategoryList className={`supper-category--list relative z-10`} data={categories}/>
                </div>
               
                <div className="trendy-main-content dark:bg-white w-full md:p-2.5">
                    <SupperCategoryContainer uniqueKey={'supper-electronic'} data={products} isLoading={isLoading}
                                                 rowCarousel={rowCarousel} showBanner={showBanner}/>
                </div>
            </div>
        </div>
    );
}
export default SuppercategoryElectronic;
