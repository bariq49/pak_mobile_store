"use client";
import descriptionData from './description-data';
import BannerGrid from "@/components/banner/banner-grid";
import {homeTwoSidebar as heroSidebar} from "@/components/banner/data";
import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import Heading from "@/components/shared/heading";


export default function DescriptionList() {
    
    return (
        <div className="flex mb-8 lg:mb-10">
            <div className="w-full ">
                {Object.entries(descriptionData).slice(0, 3).map(([key, content]) => (
                    <div className="mb-8 lg:mb-10" key={key}>
                        <Heading variant="titleMedium" className="mb-5 p-2 px-4  bg-gray-100">
                            {key.split('_').join(' ')}
                        </Heading>
                        <div className="text-15px text-brand-dark">
                            {content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-shrink-0 ps-7 xl:ps-8 hidden lg:block w-80  sticky top-16 h-full">
                <BannerGrid
                    data={heroSidebar}
                    grid={1}
                    className="relative mb-8 lg:mb-10"
                />
                <BestSidebarFeed/>
            </div>
        </div>
    );
}
