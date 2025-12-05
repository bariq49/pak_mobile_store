import cn from 'classnames';
import {useState} from 'react';
import Link from '@/components/shared/link';
import {IoIosAddCircleOutline, IoIosArrowForward, IoIosRemoveCircleOutline,} from 'react-icons/io';

import Image from '@/components/shared/image';
import {ROUTES} from '@/utils/routes';
import SubMegaVertical from "@/components/shared/mega/sub-mega-vertical";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";

function SidebarMenuItem({className, item, depth = 0}: any) {
    
    const {name, children: items, icon, type} = item;
    const {selectedColor} = usePanel();
    
    return (
        <>
            <li
                className={`flex justify-between items-center transition
                ${type != 'mega' ? 'relative' : ''} ${className ? className : 'text-sm px-3.5 2xl:px-4 '}
                `}
            >
                <Link
                    href={`${ROUTES.CATEGORIES}`}
                    className={cn(
                        'flex items-center w-full py-3  text-start outline-none focus:outline-none focus:ring-0  ',
                        {
                            [`text-brand-dark  border-b border-border-base ${colorMap[selectedColor].hoverLink}`]: depth === 0,
                        }
                    )}
                >
                    {icon && (
                        <div className="inline-flex w-8 shrink-0 3xl:h-auto">
                            <Image
                                src={icon ?? '/assets/placeholder/category-small.svg'}
                                alt={name}
                                width={25}
                                height={25}
                            />
                        </div>
                    )}
                    <span className="capitalize">{name}</span>
                    {items && (
                        <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
                          <IoIosArrowForward className="text-15px text-brand-dark opacity-40 rtl:rotate-180"/>
                        </span>
                    )}
                </Link>
                {Array.isArray(items) ? (
                    <>
                        {type != 'mega' ? (
                            <div
                                className={`dropdownMenu absolute top-0 z-10 invisible hidden w-full border opacity-0 md:block left-full bg-white border-border-base subMenu--level${depth} drop-shadow-dropDown`}
                            >
                                <ul key="content" className="px-1.5 py-3">
                                    {items?.map((currentItem) => {
                                        const childDepth = depth + 1;
                                        return (
                                            <SidebarMenuItem
                                                key={`${currentItem.name}${currentItem.slug}`}
                                                item={currentItem}
                                                depth={childDepth}
                                                className={cn(
                                                    'text-sm px-3 ltr:pl-4 rtl:pr-4 text-brand-muted ', colorMap[selectedColor].hoverLink
                                                )}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <SubMegaVertical items={items}/>
                        )}
                    </>
                ) : null}
            </li>
        </>
    );
}

function SidebarMenu({items, className, categoriesLimit}: any) {
    const [categoryMenuToggle, setcategoryMenuToggle] = useState(Boolean(false));
    const {selectedColor} = usePanel();
    
    function handleCategoryMenu() {
        setcategoryMenuToggle(!categoryMenuToggle);
    }
    
    return (
        <ul
            className={cn(
                'w-full bg-white relative border-t-0 border-2  rounded-b-md category-dropdown-menu ',
                colorMap[selectedColor].border,
                className
            )}
        >
            {items?.map((item: any, idx: number) =>
                idx <= categoriesLimit - 1 ? (
                    <SidebarMenuItem
                        key={`${item.slug}-key-${item.id}`}
                        item={item}
                    />
                ) : (
                    categoryMenuToggle && (
                        <SidebarMenuItem
                            key={`${item.slug}-key-${item.id}`}
                            item={item}
                        />
                    )
                )
            )}
            
            {items.length >= categoriesLimit && (
                <li
                    className={`px-4 relative transition text-sm hover:text-brand`}
                >
                    <div
                        className={`flex items-center w-full py-3 text-start cursor-pointer  text-brand-dark`}
                        onClick={handleCategoryMenu}
                    >
                        <div className={`inline-flex flex-shrink-0 ltr:mr-2 rtl:ml-2`}>
                            {categoryMenuToggle ? (
                                <IoIosRemoveCircleOutline className="text-xl text-brand-dark text-opacity-80"/>
                            ) : (
                                <IoIosAddCircleOutline className="text-xl text-brand-dark text-opacity-80"/>
                            )}
                        </div>
                        <span className="capitalize ">Browse All Categories</span>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default SidebarMenu;
