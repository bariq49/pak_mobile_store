import Container from '@/components/shared/container';
import Breadcrumb from '@/components/shared/breadcrumb';
import PageContent from "./page-content";

export default async function Page() {
	return (
		<div className="pt-6 lg:pt-8 pb-10">
			<Container>
				<Breadcrumb/>
				<div className="pt-7 lg:pt-8">
					<PageContent/>
				</div>
			</Container>
		</div>
	);
}
