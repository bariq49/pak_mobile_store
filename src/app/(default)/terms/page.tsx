import PageHeroSection from '@/components/shared/page-hero-section';
import {Metadata} from 'next';
import TermsPageContent from './terms-page-content';

export const metadata: Metadata = {
	title: 'Terms',
};

export default async function Page() {
	return (
		<>
			<PageHeroSection heroTitle="Terms Condition"/>
			<TermsPageContent/>
		</>
	);
}
