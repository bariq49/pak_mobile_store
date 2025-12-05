import PageHeroSection from '@/components/shared/page-hero-section';
import FaqPageContent from "@/app/(default)/faq-2/faq-page-content";



export default async function Page() {
    return (
        <>
            <PageHeroSection
                heroTitle="Faq"
                className="faq-banner-area"
            />
            <FaqPageContent/>
        </>
    );
}
