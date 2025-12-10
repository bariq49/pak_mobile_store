import CartIcon from "@/components/icons/cart-icon";
import { useCart } from "@/hooks/use-cart";
import { useUI } from "@/hooks/use-UI";
import cn from "classnames";
import React from "react";

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = "",
  hideLabel,
}) => {
  const { openDrawer, setDrawerView, drawerView } = useUI();
  const { totalItems } = useCart();

  function handleCartOpen() {
    setDrawerView("CART_SIDEBAR");
    return openDrawer();
  }
  const isCartOpen = drawerView === "CART_SIDEBAR";

  return (
    <button
      className={cn(
        "hidden lg:flex items-center focus:outline-none group",
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <div
          className={cn(
            "cart-button w-11 h-11 flex justify-center items-center rounded-full border-2 transition-colors duration-200 relative",
            isCartOpen
              ? "border-brand-light/60 bg-brand-light/10"
              : "border-border-one group-hover:border-brand-light/60"
          )}
        >
          <CartIcon
            className={cn(
              iconClassName,
              "w-5 h-5 transition-colors duration-200",
              isCartOpen
                ? "text-brand-light/80"
                : "text-brand-light group-hover:text-brand-light/60"
            )}
          />
          <span className="cart-counter-badge h-[18px] min-w-[18px] leading-6 rounded-full flex items-center justify-center bg-red-600 text-brand-light absolute -top-1 ltr:left-6 rtl:right-6 text-11px">
            {totalItems}
          </span>
        </div>
        {!hideLabel && (
          <span
            className={cn(
              "text-sm font-normal ms-2 transition-colors duration-200",
              isCartOpen
                ? "text-brand-light/80"
                : "group-hover:text-brand-light/60"
            )}
          >
            My Cart
          </span>
        )}
      </div>
    </button>
  );
};

export default CartButton;
