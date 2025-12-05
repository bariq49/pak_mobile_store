'use client';
import React, {useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {siteNavigation} from '@/data/navigation-settings';
import { useUI } from '@/hooks/use-UI';
import {useActiveScroll} from '@/utils/use-active-scroll';

import Container from '@/components/shared/container';
import Logo from '@/components/shared/logo';
import MenuIcon from '@/components/icons/menu-icon';
import SearchIcon from '@/components/icons/search-icon';
import Search from '@/components/top-search/search';
import cn from 'classnames';

import MainMenu from '@/layouts/header/main-menu';
import { MainMenuType } from '@/services/types';


const AuthDropdown = dynamic(() => import('@/layouts/header/auth-dropdown'), {
    ssr: false,
});
const CartButton = dynamic(() => import('@/layouts/header/cart-button'), {
    ssr: false,
});


interface HeaderProps {
    className?: string;
    variant?: string;
}
const Header: React.FC<HeaderProps> = ({className}) => {
    const {openSidebar,displaySearch,  openSearch,  displayMobileSearch} = useUI();
    const siteHeaderRef  = useRef<HTMLDivElement| null>(null);
    
    useActiveScroll(siteHeaderRef as React.RefObject<HTMLElement>);
    
    function handleMobileMenu() {
        return openSidebar();
    }
    
    
    return (
        <>
            <header
                id="siteHeader"
                ref={siteHeaderRef}
                className={cn(
                    'header-three bg-brand-dark xl:bg-none sticky-header sticky top-0 z-50  w-full ',
                    displayMobileSearch && 'active-mobile-search',
                    className,

                )}
            >
                <div className={cn("innerSticky z-20 w-full transition duration-200 ease-in-out  body-font ")}>
                    <Search
                        searchId="mobile-search"
                        className="topbar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    
                    <div className=" navbar">
                        <Container>
                            <div className="flex items-center justify-between   md:gap-8 py-4 md:py-3">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="bg-brand-dark text-white rounded focus:outline-none flex-shrink-0 text-sm  text-skin-inverted px-2.5 md:px-3 lg:px-[18px] py-2.5 md:py-2.5 lg:py-3 flex items-center transition-all"
                                        onClick={handleMobileMenu}
                                    >
                                        <MenuIcon/>
                                    </button>
                                </div>
                                <Logo variant={"dark"} className="logo"/>
                                {/* End of logo */}
                                
                                <MainMenu
                                    navigations={siteNavigation.menu as MainMenuType[]}
                                    className="hidden lg:flex transition-all duration-200 ease-in-out"
                                    classLink={"text-brand-light"}
                                />
                                
                                {displaySearch && (
                                    <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search
                                            className="max-w-[780px] xl:max-w-[1000px]"
                                        />
                                    </div>
                                )}
                                {/* End of conditional search  */}
                                
                                <div className="lg:ms-auto text-brand-light flex text-sm space-x-5 xl:space-x-10 lg:max-w-[33%] xl:min-w-[200px]">
                                    <button
                                        type="button"
                                        aria-label="Search Toggle"
                                        onClick={() => openSearch()}
                                        title="Search toggle"
                                        className="outline-none  w-12 md:w-14 h-full hidden lg:flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                                    >
                                        <SearchIcon width={"26px"} height={"26px"} className="text-base"/>
                                    </button>
                                    {/* End of search handler btn */}
                                    
                                    <AuthDropdown hideLabel={true} />
                                    
                                    <CartButton className="hidden lg:flex" hideLabel={true}/>
                                </div>
                                {/* End of auth  */}
                                
                                
                            </div>
                        </Container>
                    </div>
                    
                </div>
            </header>
            
        </>
    );
}

export default Header;
