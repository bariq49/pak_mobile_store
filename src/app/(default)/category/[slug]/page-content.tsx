'use client';
import { Element } from 'react-scroll';
import React, {useState} from "react";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import {LIMITS} from "@/services/utils/limits";
import {useProductsQuery} from "@/services/product/get-all-products";
import {usePathname} from "next/navigation";
import useQueryParam from "@/utils/use-query-params";
import {ProductMain} from "@/components/product/productListing/product-main";

export default function PageContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	const pathname = usePathname();
	const { getParams, query } = useQueryParam(pathname ?? '/');
	const newQuery: { sort_by?: string } = getParams(
		`${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
	);
	// Get category query parameters
	const limit = LIMITS.PRODUCTS_LIMITS;
	const { data, isLoading } = useProductsQuery({
		limit: limit,
		sort_by: newQuery.sort_by,
	});
	
	
	return (
		<Element name="category" className="flex products-category">
			<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
				<Filters/>
			</div>
			<div className="w-full">
				<DrawerFilter />
				<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
				<ProductMain data={data} isLoading={isLoading} viewAs={viewAs}/>
			</div>
		</Element>
	
	);
}
