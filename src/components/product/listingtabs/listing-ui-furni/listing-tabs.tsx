"use client";
import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import useWindowSize from "@/utils/use-window-size";
import {useMemo} from "react";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import Link from "@/components/shared/link";
import {Category} from "@/services/types";
import MobileDropdownTabs from "@/components/product/listingtabs/listing-ui/mobileDropdownTabs";

interface Props {
    className?: string;
    data: any;
    onNavClick:   (categories: number) => void ;
    activeTab?: number ;
    variant?: string| undefined;
}

const ListingTabs: React.FC<Props> = ({ className , data, onNavClick, activeTab,variant}) => {
    const {width} = useWindowSize();

    const {selectedColor} = usePanel();
    const isDesktopView = useMemo(() => width! > 1280, [width]);
    return (
        <div
            className={cn(
                'sm:flex items-center ',
                className,
                {
                    ['block-title mb-3 md:mb-5 lg:justify-between'] : variant ==="furniture"
                }
            )}
        >
            <h3 className="text-xl  text-brand-dark font-medium ">
                <Link href={`${ROUTES.CATEGORY}/${data?.slug}`}>
                    {data?.name}
                    {variant === 'outBorder' && <span className="font-light"> Product</span>}
                </Link>
            </h3>
            
            {Array.isArray(data?.children) ? (
                <>
                    {isDesktopView ? (
                        <div className=" ltabs-tabs-wrap flex flex-wrap	 justify-end  xl:pe-24 bg-white relative z-10">
                            <ul key="content" className="flex text-sm leading-7 bg-white dark:bg-background">
                                {data?.children
                                    .slice(0, 4)
                                    ?.map((currentItem: Category, idx: number) => {
                                        return (
                                            <li
                                                className={`ps-3`}
                                                key={`${idx}`}
                                            >
                                                <button
                                                key={idx}
                                                onClick={() => onNavClick(currentItem.id as number)}
                                                className={`px-2 rounded ${
                                                    activeTab === currentItem.id ? `${colorMap[selectedColor].text} text-brand-light` : `text-brand-dark/70 ${colorMap[selectedColor].hoverLink}`
                                                }`}
                                                >
                                                {currentItem.name}
                                                </button>
                                               
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    ) : <MobileDropdownTabs childrenData={data.children} onNavClick={onNavClick} />}
                </>
            ) : null}
        </div>
    );
};

export default ListingTabs;
