'use client';
import React from "react";
import { Element } from 'react-scroll';
import {useParams} from "next/navigation";

import ProductDetailsTab from "@/components/product/productDetails/description-tab";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import {useProductQuery} from "@/services/product/get-product";
import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";

import Loading from "@/components/shared/loading";
import {variationsRectangle} from "@/components/product/productView/data-variations/variations-rectangle";
import {Variation} from "@/services/types";
import useProductVariations from "@/hooks/use-product-variations";

export default function PageContent() {
	const pathname = useParams();
	const {slug} = pathname;
	const {data , isLoading} = useProductQuery(slug as string);

	// Initialize attributes dynamically based on product variations
	const { initialAttributes} = useProductVariations(data);
	const [attributes, setAttributes] = React.useState<{ [key: string]: string }>(initialAttributes);

	if (isLoading) return <Loading/>;

	return (
		<>
			<Element name="category" className="xl:flex flex-row-reverse">
				<div className="xl:sticky z-40  lg:block h-full shrink-0 top-20 w-full  xl:w-[36%] ">
					<ProductView data={data}
								 className={"mb-8 lg:mb-20 "}
								 attributes={attributes}
								 setAttributes={setAttributes}
								 useVariations={variationsRectangle.variations as Variation[]}/>
				</div>
				<div className="w-full  xl:w-[64%] xl:pe-10  xl:mb-0 mb-8">
					<ProductGallery data={data}
									className={"mb-8 lg:mb-20 "}
									attributes={attributes}/>
					<ProductDetailsTab/>
				</div>

			</Element>

			<RelatedProductSlider/>
		</>


	);
}
