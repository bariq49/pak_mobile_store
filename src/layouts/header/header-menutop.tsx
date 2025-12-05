
import Link from '@/components/shared/link';
import {FaChevronDown} from 'react-icons/fa';
import cn from 'classnames';
import { useWishlist } from '@/hooks/use-wishlist';

import {MenutopType} from "@/services/types";
import {useIsMounted} from "@/utils/use-is-mounted";
import Direction from '@/layouts/header/action/direction';
import SwitchDark from '@/layouts/header/action/switch-dark';

interface MenuProps {
    data?: MenutopType[];
    className?: string;
    classNameLink?: string;
    variant?: string;
}

const HeaderMenutop: React.FC<MenuProps> = ({data, className, classNameLink}) => {
    const {wishlistList} = useWishlist(); // this is just the array of products
    const mounted = useIsMounted();
    return (
        <nav
            className={cn(
                ' flex relative ',
                className
            )}
        >
            {data?.map((item: any) => (// eslint-disable-line @typescript-eslint/no-explicit-any
                <div
                    className={`menuItem group cursor-pointer mx-2 md:mx-3 ${
                        item.subMenu ? 'relative' : ''
                    }`}
                    key={item.id}
                >
                    <Link
                        href={item.path}
                        className={`${classNameLink ? classNameLink : 'text-brand-muted'} inline-flex items-center py-2 font-normal relative `}
                    >
                        {item.label}
                        {item.label === 'Wishlist' && mounted && [` (${wishlistList.length})`] }
                        
                        {(item.subMenu) && (
                            <span
                                className={`text-xs mt-1 xl:mt-0.5 w-4 flex justify-end  opacity-40 group-hover:text-brand ${classNameLink ? classNameLink : 'text-fill-base'}`}>
                        <FaChevronDown
                            className="transition duration-300 ease-in-out transform group-hover:-rotate-180"/>
                    </span>
                        )}
                    </Link>
                
                </div>
            ))}

            <Direction/>
            <SwitchDark/>
            
            
        </nav>
    );
};

export default HeaderMenutop;
