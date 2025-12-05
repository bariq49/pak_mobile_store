'use client';

import BackToTopButton from '@/components/shared/back-to-top';
import BottomNavigation from "@/layouts/header/mobile-navigation";

import Header from '@/layouts/header';
import Header3 from "@/layouts/home3/header";
import Header4 from "@/layouts/home4/header";
import Header5 from "@/layouts/home5/header";
import Header6 from "@/layouts/home6/header";
import Header8 from "@/layouts/home8/header";
import Header9 from "@/layouts/home9/header";
import Header10 from "@/layouts/home10/header";

import Footer from '@/layouts/footer';
import Footer4 from '@/layouts/home4/footer';
import Footer9 from '@/layouts/home9/footer';
import Footer10 from '@/layouts/home10/footer';

import {usePanel} from "@/hooks/use-panel";

export default function Home5Layout({
	                                    children,
                                    }: {
	children: React.ReactNode;
}) {
	const { selectedLayout,selectedFooter } = usePanel();
	return (
		<div className="flex flex-col min-h-screen">
			{/* Panel Header Layout */}
			{
				selectedLayout === 'Basic' ? <Header/>
				: selectedLayout === 'Header3' ? <Header3/>
				: selectedLayout === 'Header4' ? <Header4/>
				: selectedLayout === 'Header5' ? <Header5/>
				: selectedLayout === 'Header6' ? <Header6/>
				: selectedLayout === 'Header8' ? <Header8/>
				: selectedLayout === 'Header9' ? <Header9/>
				: selectedLayout === 'Header10' ? <Header10/>
				: <Header5/>
			}
			<main
				className="relative pt-5 xl:pt-6 pb-10 bg-[#f7f7f7] dark:bg-gray-100"
				style={{
					WebkitOverflowScrolling: 'touch',
				}}
			>
				{children}
			</main>
			
			{/* Panel - Footer Layout */}
			{
				selectedFooter === 'Basic' ? <Footer showWidgetSubscription={true}/>
				: selectedFooter === 'Footer4' ? <Footer4 variant={"home4"}/>
				: selectedFooter === 'Footer7' ? <Footer4 variant={"home7"}/>
				: selectedFooter === 'Footer8' ? <Footer4 variant={"home8"}/>
				: selectedFooter === 'Footer9' ? <Footer9 variant={"home9"}/>
				: selectedFooter === 'Footer10' ? <Footer10 variant={"home10"}/>
				: <Footer4 variant={"home4"}/>
			}
			
			<BottomNavigation />
			<BackToTopButton/>
		</div>
	);
}
