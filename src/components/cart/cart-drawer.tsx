import Scrollbar from "@/components/shared/scrollbar";
import { useCart } from "@/hooks/use-cart";
import { useUI } from "@/hooks/use-UI";
import usePrice from "@/services/product/use-price";
import CartItemDrawer from "./cart-item-drawer";
import EmptyCart from "./empty-cart";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import Heading from "@/components/shared/heading";
import Text from "@/components/shared/text";
import { X } from "lucide-react";

export default function CartDrawer() {
  const { closeDrawer } = useUI();
  const { items, total, isEmpty } = useCart();
  const { price: cartTotal } = usePrice({ amount: total });

  return (
    <div className="flex flex-col w-full h-full px-5 md:px-8 pt-0">
      {/* Header */}
      <div className="relative flex items-center justify-between w-full border-b-2 border-neutral-200/70 dark:border-neutral-700/70 mb-3 md:mb-5">
        <Heading variant="titleMedium">Your Cart</Heading>
        <button
          className="flex items-center justify-center text-3xl transition-opacity py-4 lg:py-5 focus:outline-none text-brand-dark hover:opacity-60"
          onClick={closeDrawer}
          aria-label="Close Cart"
        >
          <X />
        </button>
      </div>

      {/* Cart Items */}
      {!isEmpty ? (
        <>
          <Scrollbar className="flex-grow w-full cart-scrollbar">
            <div className="w-full h-[calc(100vh_-_300px)]">
              {items?.map((item, index) => (
                <CartItemDrawer item={item} key={`${item.id}-${index}`} />
              ))}
            </div>
          </Scrollbar>

          {/* Cart Summary */}
          <div className="pt-5 pb-5 border-t-2 border-neutral-200/70 dark:border-neutral-700/70 md:pt-6 md:pb-6">
            <div className="flex items-center justify-between pb-5 md:pb-7">
              <Heading className="mb-0" variant="title">
                Cart Total:
              </Heading>
              <div className="font-semibold text-base md:text-lg text-brand-dark text-right">
                {cartTotal}
              </div>
            </div>
            {/* Buttons */}
            <div
              className="grid grid-col1 md:grid-cols-2 gap-5"
              onClick={closeDrawer}
            >
              <Link href={ROUTES.CART} variant="button-border">
                <span>Go to Cart</span>
              </Link>

              <Link href={ROUTES.CHECKOUT} variant="button-primary">
                <span>Checkout</span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
