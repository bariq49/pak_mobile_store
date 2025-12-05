"use client";
import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import useWindowSize from "@/utils/use-window-size";
import {useMemo} from "react";

import Link from "@/components/shared/link";
import DesktopTabs from "@/components/product/listingtabs/listing-ui/desktopTabs";
import MobileDropdownTabs from "@/components/product/listingtabs/listing-ui/mobileDropdownTabs";


const ListingTabs = ({ className, data, onNavClick, activeTab, variant }: any) => {
    const {width} = useWindowSize();
    const isDesktopView = useMemo(() => width! > 1280, [width]);
    
    return (
        <div
            className={cn(
                'sm:flex items-center ',
                className,
                {
                    ['gap-5 mb-3'] : variant ==="outBorder" ,
                    ['px-5 py-2.5 block-title mb-1.5 gap-2'] : variant ==="default" || variant ==="large"
                }
            )}
        >
            <h3 className="text-xl  text-brand-dark font-medium xl:basis-[30%]">
                <Link href={`${ROUTES.CATEGORY}/${data?.slug}`}>
                    {data?.name}
                    {variant === 'outBorder' && <span className="font-light"> Product</span>}
                </Link>
            </h3>

            {Array.isArray(data?.children) && (
                isDesktopView
                    ? <DesktopTabs childrenData={data.children} activeTab={activeTab} onNavClick={onNavClick} />
                    : <MobileDropdownTabs childrenData={data.children} onNavClick={onNavClick} />
            )}
        </div>
    );
};

export default ListingTabs;
