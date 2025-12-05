'use client';

import React from "react";
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import {CategoriesContainer} from "@/components/category/categories-container";
import Loading from "@/components/shared/loading";

export default function CategoriesPageContent() {
	const {data : categories, isLoading} = useCategoriesQuery({
		limit: 9,
	});
	
	if (isLoading) return <Loading/>;
	
	return <CategoriesContainer categories = {categories}/>
}
