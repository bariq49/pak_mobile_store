"use client";

import { TableCell, TableRow } from "@/components/shared/table";
import { useCart } from "@/hooks/use-cart";
import usePrice from "@/services/product/use-price";
import Counter from "@/components/shared/counter";
import { ROUTES } from "@/utils/routes";
import Link from "@/components/shared/link";
import Image from "@/components/shared/image";
import { Item } from "@/services/utils/cartUtils";
import { productPlaceholder } from "@/assets/placeholders";
import { Loader } from "lucide-react";

interface CartItemProps {
  item: Item;
}

export function CartItem({ item }: CartItemProps) {
  const { id, name, image, quantity = 1, slug, product_type } = item ?? {};

  // Cart hooks
  const { useCartHelpers, useCartActions } = useCart();
  const { isInStock, isInCart } = useCartHelpers();
  const { updateQuantity, removeItem, isUpdating, isRemoving } =
    useCartActions();

  // Check if dealPrice exists and is valid (not null, > 0, and < originalPrice)
  const hasBackendDeal =
    typeof item.originalPrice === "number" &&
    item.originalPrice > 0 &&
    typeof item.dealPrice === "number" &&
    item.dealPrice !== null &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  // Use dealPrice if valid, otherwise use originalPrice
  const unitAmount = hasBackendDeal
    ? item.dealPrice!
    : (typeof item.originalPrice === "number" && item.originalPrice > 0
        ? item.originalPrice
        : item.price);

  // baseAmount is originalPrice when there's a deal, otherwise same as unitAmount
  const baseAmount = hasBackendDeal
    ? item.originalPrice!
    : unitAmount;

  const { price, basePrice } = usePrice({
    amount: unitAmount,
    baseAmount: hasBackendDeal ? baseAmount : undefined,
  });

  const { price: minPrice } = usePrice({
    amount: item?.min_price ?? 0,
  });
  const { price: maxPrice } = usePrice({
    amount: item?.max_price ?? 0,
  });

  // For line total calculations: use dealPrice if valid, otherwise originalPrice
  const effectiveLineUnit = hasBackendDeal && typeof item.dealPrice === "number"
    ? item.dealPrice
    : (typeof item.originalPrice === "number" && item.originalPrice > 0
        ? item.originalPrice
        : item.price);

  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal ?? effectiveLineUnit * quantity,
  });

  const outOfStock = isInCart(item?.id) && !isInStock(item.id);

  return (
    <TableRow>
      <TableCell>
        <div className="w-20 h-20 relative">
          <Link
            href={{ pathname: `${ROUTES.PRODUCT}/${slug}` }}
            className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
          >
            <Image
              src={image || productPlaceholder}
              width={80}
              height={80}
              alt={name || "Product Image"}
              className="object-contain"
            />
          </Link>
        </div>
      </TableCell>

      <TableCell>
        <Link
          href={{ pathname: `${ROUTES.PRODUCT}/${slug}` }}
          className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px"
        >
          {item?.name}
        </Link>

        <button
          onClick={() => removeItem(item)}
          disabled={isRemoving}
          className="mt-1 inline-flex items-center gap-1 cursor-pointer transition-all text-gray-500 text-13px underline disabled:opacity-50"
        >
          {isRemoving ? (
            <>
              <Loader className="w-3 h-3 animate-spin" /> Removing...
            </>
          ) : (
            "Remove"
          )}
        </button>
      </TableCell>

      <TableCell>
        <div className="space-s-2 mt-2 block mb-2">
          <span className="inline-block font-semibold">
            {product_type === "variable" ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1 text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </TableCell>

      <TableCell>
        <Counter
          value={quantity}
          onIncrement={() => updateQuantity(item, quantity + 1)}
          onDecrement={() =>
            quantity > 1
              ? updateQuantity(item, quantity - 1)
              : removeItem(item)
          }
          variant="cart"
          disabled={outOfStock || isUpdating || isRemoving}
        />
      </TableCell>

      <TableCell>
        <div className="font-semibold text-brand-dark mt-2 block mb-2">
          {totalPrice}
        </div>
      </TableCell>
    </TableRow>
  );
}
