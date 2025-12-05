'use client';
import React from "react";
import {Element} from 'react-scroll';
import {useParams} from "next/navigation";

import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import {useProductQuery} from "@/services/product/get-product";
import ProductView from "@/components/product/productDetails/product-view";

import ProductImageGrid from "@/components/product/productDetails/product-image-grid";
import DescriptionAccordion from "@/components/product/productDetails/description-accordion";
import Loading from "@/components/shared/loading";
import ProductReview from "@/components/product/productDetails/product-review";
import {Variation} from "@/services/types";
import {variationsSwatchImage} from "@/components/product/productView/data-variations/variations-swatch-image";
import useProductVariations from "@/hooks/use-product-variations";

export default function PageContent() {
    const pathname = useParams();
    const {slug} = pathname;
    const {data, isLoading} = useProductQuery(slug as string);

    // Initialize attributes dynamically based on product variations
    const { initialAttributes} = useProductVariations(data);
    const [attributes, setAttributes] = React.useState<{ [key: string]: string }>(initialAttributes);

    if (isLoading) return <Loading/>;
    
    return (
        <Element name="category" className=" products-category">
            <div className="xl:flex gap-7 items-start 2xl:gap-10 mb-8 lg:mb-20 ">
                <ProductImageGrid variant={"innerZoom"}  data={data} className={"w-full  xl:w-[55%]  "}/>
                <div className="xl:sticky z-40  lg:block h-full shrink-0 top-20 w-full  xl:w-[40%] ">
                    <ProductView
                        data={data}
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                    <DescriptionAccordion/>
                </div>
            </div>
            
            <ProductReview className={"mb-8 lg:mb-20"} useHeading={true}/>
            <RelatedProductSlider/>
        </Element>
    );
}
