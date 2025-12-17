"use client";
import Link from "@/components/shared/link";
import Image from "@/components/shared/image";
import { useCart } from "@/hooks/use-cart";
import usePrice from "@/services/product/use-price";
import { ROUTES } from "@/utils/routes";
import Counter from "@/components/shared/counter";
import { Item } from "@/services/utils/cartUtils";
import { productPlaceholder } from "@/assets/placeholders";
import { Loader } from "lucide-react";

type CartItemProps = {
  item: Item;
};

const CartItemDrawer: React.FC<CartItemProps> = ({ item }) => {
  const { useCartHelpers, useCartActions } = useCart();
  const { isInStock, isInCart } = useCartHelpers();
  const { updateQuantity, removeItem, isUpdating, isRemoving } =
    useCartActions();

  const quantity = item.quantity ?? 1;

  // Check if dealPrice exists and is valid (not null, > 0, and < originalPrice)
  const hasBackendDeal =
    typeof item.originalPrice === "number" &&
    item.originalPrice > 0 &&
    typeof item.dealPrice === "number" &&
    item.dealPrice !== null &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  // Use dealPrice if valid, otherwise use originalPrice
  const effectiveUnit = hasBackendDeal && typeof item.dealPrice === "number"
    ? item.dealPrice
    : (typeof item.originalPrice === "number" && item.originalPrice > 0
        ? item.originalPrice
        : item.price);

  // For display: unit price with strike-through if deal exists
  const unitAmount = hasBackendDeal
    ? item.dealPrice!
    : (typeof item.originalPrice === "number" && item.originalPrice > 0
        ? item.originalPrice
        : item.price);

  const baseAmount = hasBackendDeal
    ? item.originalPrice!
    : undefined;

  const { price: unitPrice, basePrice } = usePrice({
    amount: unitAmount,
    baseAmount,
  });

  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal ?? effectiveUnit * quantity,
  });

  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  return (
    <div className="group w-full flex border-b border-neutral-100 dark:border-neutral-700/70 py-4 md:py-5 relative last:border-b-0">
      <div className="relative flex rounded overflow-hidden shrink-0 w-[80px]">
        <Link
          href={`/${ROUTES.PRODUCT}/${item.slug}`}
          className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
        >
          <Image
            src={item.image || productPlaceholder}
            width={80}
            height={80}
            alt={item.name || "Product Image"}
            className="object-contain bg-fill-thumbnail"
          />
        </Link>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-5 md:rtl:pr-5">
          <Link
            href={{ pathname: `${ROUTES.PRODUCT}/${item.slug}` }}
            className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px"
          >
            {item.name}
          </Link>
          <div className="text-sm font-semibold text-brand-dark mt-2 block mb-2">
            <div className="flex items-center gap-2">
              <span>{unitPrice}</span>
              {basePrice && (
                <del className="text-xs text-gray-400 text-opacity-70">
                  {basePrice}
                </del>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total: {totalPrice}
            </div>
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            <Counter
              value={quantity}
              onIncrement={() =>
                updateQuantity(item, quantity + 1)
              }
              onDecrement={() =>
                quantity > 1
                  ? updateQuantity(item, quantity - 1)
                  : removeItem(item)
              }
              variant="cart"
              disabled={outOfStock || isUpdating || isRemoving}
            />

            <button
              onClick={() => removeItem(item)}
              disabled={isRemoving}
              className="flex items-center gap-1 text-gray-500 text-13px underline cursor-pointer disabled:opacity-50"
            >
              {isRemoving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" /> Removing...
                </>
              ) : (
                "Remove"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemDrawer;
