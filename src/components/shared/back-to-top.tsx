"use client"
import {IoIosArrowUp} from 'react-icons/io';
import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import cn from "classnames";

const BackToTopButton: React.FC = () => {
    const [isShow, setIsShow] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScrollListener = debounce(() => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalScrollHeight = document.body.scrollHeight;

            // Calculate scroll progress as a percentage (0 to 100)
            const scrollableHeight = totalScrollHeight - windowHeight;
            const progress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0;
            setScrollProgress(Math.min(Math.max(progress, 0), 100));

            // Show/hide button based on scroll position
            if (currentScrollY <= 100) {
                setIsShow(false);
                return;
            }

            setIsShow(true);
        }, 100);

        window.addEventListener('scroll', handleScrollListener);

        return () => {
            window.removeEventListener('scroll', handleScrollListener);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div onClick={handleClick}
             className={cn(
                 "fixed bottom-40 md:bottom-20 end-5 z-[100] flex content-center items-center cursor-pointer rounded  ",
                 "w-11  h-11 bg-white drop-shadow-lg overflow-hidden  transition ease-in-out duration-200",
                 {'opacity-0 translate-y-7' :!isShow}
                 )}
            >
             <span
                 className="absolute left-0 bottom-0 w-full bg-black "
                 style={{height: `${scrollProgress}%`}}
             ></span>
            <IoIosArrowUp className="relative text-2xl m-auto z-10 text-white mix-blend-difference"/>
        </div>
    )
}

export default BackToTopButton;
