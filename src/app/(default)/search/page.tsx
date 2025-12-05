import {Metadata} from "next";
import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import PageContent from "@/app/(default)/search/page-content";
import CategoryPageContent from "@/app/(default)/category/category-page-content";
import React, {Suspense} from "react";
import Loading from "@/components/shared/loading";

export const metadata: Metadata = {
	title: 'Search Page',
};
function SearchBarFallback() {
	return <Loading/>
}
export default async function Page() {
	
	return (
		<Container>
			<div className="py-7 lg:py-8  blog-category">
				<Breadcrumb/>
				<Suspense fallback={<SearchBarFallback />}>
					<div className="pt-7 lg:pt-8">
						<PageContent/>
					</div>
				</Suspense>
				
			</div>
		</Container>
	);
}
