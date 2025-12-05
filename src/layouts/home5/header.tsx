'use client';
import React, {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {siteNavigation} from '@/data/navigation-settings';
import { useUI } from '@/hooks/use-UI';
import {useActiveScroll} from '@/utils/use-active-scroll';

import Container from '@/components/shared/container';
import Logo from '@/components/shared/logo';
import Text from '@/components/shared/text';
import MenuIcon from '@/components/icons/menu-icon';
import SearchIcon from '@/components/icons/search-icon';
import Search from '@/components/top-search/search';
import cn from 'classnames';
import {FiMenu} from 'react-icons/fi';

import MainMenu from '@/layouts/header/main-menu';
import HeaderMenutop from '@/layouts/header/header-menutop';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

import CategoryDropdownNav from '@/components/category/category-dropdown-nav';
import { MainMenuType } from '@/services/types';
import {Headset} from "lucide-react";
const AuthDropdown = dynamic(() => import('@/layouts/header/auth-dropdown'), {
    ssr: false,
});
const CartButton = dynamic(() => import('@/layouts/header/cart-button'), {
    ssr: false,
});

type DivElementRef = HTMLDivElement | null;

interface HeaderProps {
    className?: string;
}
const Header: React.FC<HeaderProps> = ({className}) => {
    const {openSidebar,displaySearch,  openSearch, displayMobileSearch} = useUI();
    const siteHeaderRef = useRef<HTMLDivElement>(null);
    const [toggleAllCategory, setToggleAllCategory] = useState(Boolean(true));
    const { selectedColor } = usePanel();
    
    useActiveScroll(siteHeaderRef as React.RefObject<HTMLElement>);
    
    function handleMobileMenu() {
        return openSidebar();
    }
    
    function handleCategoryMenu() {
        setToggleAllCategory(!toggleAllCategory);
    }
    
    //window resize event listener CategoryMenu
    useEffect(() => {
        function handleResize(): void {
            window.innerWidth > 1600 ? setToggleAllCategory(true) : setToggleAllCategory(false);
        }
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <header
                id="siteHeader"
                ref={siteHeaderRef}
                className={cn(
                    'bg-white',
                    'header-one sticky-header sticky top-0 z-50 lg:relative w-full ',
                    displayMobileSearch && 'active-mobile-search',
                    className,
                
                )}
            >
                <div className={cn(
                    "innerSticky z-20 w-full transition duration-200 ease-in-out  body-font ",
                )}>
                    <Search
                        searchId="mobile-search"
                        className="topbar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    <div className="top-bar text-13px  border-b border-black/10 dark:border-white/10">
                        <Container variant={'Medium'}>
                            <div className="h-12 flex justify-between items-center">
                                <Text className={`text-13px hidden md:block truncate m-0`} variant={"small"}>
                                    Free International Shipping. No Minimum Purchase Required
                                </Text>
                                <div className="flex flex-shrink-0 smx-auto pace-s-5">
                                    <HeaderMenutop
                                        data={siteNavigation.topmenu}
                                        className="flex transition-all duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="border-0 ">
                        <Container variant={'Medium'}>
                            <div className="flex items-center justify-between  py-2 md:py-5">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="bg-brand-dark text-brand-light rounded focus:outline-none flex-shrink-0 text-sm  text-skin-inverted px-2.5 md:px-3 lg:px-[18px] py-2.5 md:py-2.5 lg:py-3 flex items-center transition-all"
                                        onClick={handleMobileMenu}
                                    >
                                        <MenuIcon/>
                                    </button>
                                </div>
                                <Logo  className="logo ps-3 md:ps-0 lg:mx-0"/>
                                {/* End of logo */}
                                
                                <div className={`text-sm gap-2 lg:flex hidden`}>
                                    <Headset size={36} className={colorMap[selectedColor].text} />
                                    <div>
                                        <div className="text-gray-400 ">Hotline Free:</div>
                                        <a className="font-medium text-brand-dark">
                                            (1800)-000-6890
                                        </a>
                                    </div>
                                </div>
                                {/* End of Phone */}
                                
                                <Search
                                    searchId="top-search"
                                    variant={"fill"}
                                    className="hidden lg:flex lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[790px]"
                                />
                                {/* End of search */}
                                
                                <div className=" flex text-sm space-x-5 xl:space-x-15 lg:max-w-[33%] xl:min-w-[110px]">
                                    <AuthDropdown hideLabel={true} />
                                    
                                    <CartButton hideLabel={true} className="hidden lg:flex" />
                                </div>
                                {/* End of auth  */}
                            </div>
                        </Container>
                    </div>
                    <div
                        className={cn("hidden navbar  lg:block ", colorMap[selectedColor].header)}>
                        <Container variant={'Medium'}>
                            <div className="flex justify-between items-center">
                                <Logo variant={'dark'}
                                      className="navbar-logo w-0 opacity-0 "
                                />
                                {/* End of logo */}
                                
                                <div className="categories-header-button relative  xl:me-8 w-52 xl:w-72">
                                    <button
                                        className="text-brand-light min-h-[50px] focus:outline-none w-full uppercase font-medium  py-4 flex items-center  "
                                        onClick={handleCategoryMenu}
                                    >
                                        <FiMenu className="text-2xl me-3"/>
                                        All Categories
                                    </button>
                                    {toggleAllCategory && <CategoryDropdownNav categoriesLimit={9}/>}
                                </div>
                                
                                <MainMenu
                                    navigations={siteNavigation.menu as MainMenuType[]}
                                    className="flex transition-all duration-200 ease-in-out"
                                    classLink={"md:text-brand-light group-hover:text-[#16bcdc]"}
                                />
                                {/* End of main menu */}
                                
                                {displaySearch && (
                                    <div
                                        className="sticky-search  w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search className="max-w-[780px] xl:max-w-[830px] "/>
                                    </div>
                                )}
                                {/* End of conditional search  */}
                                
                                <div
                                    className="text-brand-light ms-auto flex items-center xl:min-w-[200px] flex-shrink-0">
                                    <div
                                        className="navbar-right flex items-center w-0 opacity-0">
                                        <button
                                            type="button"
                                            aria-label="Search Toggle"
                                            onClick={() => openSearch()}
                                            title="Search toggle"
                                            className="outline-none me-2 xl:me-6 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                                        >
                                            <SearchIcon className="w-[24px] h-[24px] text-base"/>
                                        </button>
                                        {/* End of search handler btn */}
                                        
                                        <div className="flex-shrink-0 flex items-center">
                                            <AuthDropdown  hideLabel={true} />
                                        </div>
                                        {/* End of auth */}
                                        
                                        <CartButton className="ms-5 xl:ms-8 "/>
                                        {/* End of cart btn */}
                                    </div>
                                </div>
                            
                            </div>
                        </Container>
                    </div>
                </div>
            </header>
           
        </>
    );
}

export default Header;
