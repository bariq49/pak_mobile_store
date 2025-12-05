import CartIcon from '@/components/icons/cart-icon';
import {useCart} from '@/hooks/use-cart';
import { useUI } from '@/hooks/use-UI';
import cn from 'classnames';
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/hooks/use-panel";
import React from "react";

type CartButtonProps = {
    className?: string;
    iconClassName?: string;
    hideLabel?: boolean;
    variant?: Variant;
};
type Variant =
    | 'Border'
    | 'Border-white'
    | 'Normal';

const CartButton: React.FC<CartButtonProps> = ({
                                                   className,
                                                   iconClassName = '',
                                                   hideLabel,
                                                   variant='Normal',
                                               }) => {
    const {openDrawer, setDrawerView} = useUI();
    const {totalItems} = useCart();
    
    function handleCartOpen() {
        setDrawerView('CART_SIDEBAR');
        // isShowing;
        return openDrawer();
    }
    const { selectedColor } = usePanel();
    
    const sizeIcon = variant ==='Border'  ? `w-5 h-5 ${colorMap[selectedColor].text}`:
        variant ==='Border-white'  ? `w-5 h-5 text-brand-light`
            : '';
    
    return (
        <button
            className={cn(
                'myCart',
                'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
                className
            )}
            onClick={handleCartOpen}
            aria-label="cart-button"
        >
            <div className="relative flex items-center group">
                <div className='flex items-center relative '>
                    <div className={cn("cart-button",{
                        [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2 border-brand-light/20`] : variant ==='Border',
                        [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2 xs:border-brand-light`] : variant ==='Border-white',
                    })}>
                    <CartIcon className={cn(iconClassName, sizeIcon)}/>
                    </div>
                    <span className="cart-counter-badge  h-[18px] min-w-[18px] leading-6 rounded-full flex items-center justify-center bg-red-600 text-brand-light absolute -top-1 ltr:left-6 rtl:right-6 text-11px">
                      {totalItems}
                    </span>
                </div>
                {!hideLabel && (
                    <span className="text-sm font-normal ms-2 myCartLabel">
                      My Cart
                    </span>
                )}
            
            </div>
        
        </button>
    );
};

export default CartButton;
