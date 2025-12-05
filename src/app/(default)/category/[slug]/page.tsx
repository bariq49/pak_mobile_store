import {Metadata} from "next";
import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import PageContent from "@/app/(default)/category/[slug]/page-content";

export const metadata: Metadata = {
	title: 'Category Page',
};
export default async function Page() {
	
	return (
		<Container>
			<div className="py-7 lg:py-8  blog-category">
				<Breadcrumb/>
				<div className="pt-7 lg:pt-8">
					<PageContent/>
				</div>
			</div>
		</Container>
	);
}
