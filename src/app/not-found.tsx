'use client';

import ErrorInformation from '@/components/404/error-information';
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import BottomNavigation from "@/layouts/header/mobile-navigation";

export default function NotFound() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header/>
			<main
				className="relative flex-grow"
				style={{
					WebkitOverflowScrolling: 'touch',
				}}
			>
				<ErrorInformation/>
			</main>
			<Footer />
			<BottomNavigation/>
		</div>
	);
}
