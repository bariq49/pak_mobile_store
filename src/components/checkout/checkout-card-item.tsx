"use client";
import { Item } from "@/services/utils/cartUtils";
import Image from "@/components/shared/image";
import usePrice from "@/services/product/use-price";
import React from "react";
import { productPlaceholder } from "@/assets/placeholders";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
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

  const { price: lineTotal } = usePrice({
    amount: item.itemTotal ?? effectiveUnit * quantity,
  });

  const hasTax = typeof item.tax === "number" && item.tax > 0;

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex w-16 h-16 rounded shrink-0 overflow-hidden bg-gray-50">
        <Image
          src={item.image || productPlaceholder}
          alt={"item image"}
          className="object-contain"
          width={64}
          height={64}
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h6 className="font-normal text-base text-brand-dark leading-snug">
          <span className="font-medium">{item.quantity} x </span>
          {item.name}
        </h6>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-sm">{unitPrice}</span>
          {basePrice && (
            <del className="text-xs text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        {hasTax && (
          <span className="text-xs text-gray-500 mt-1">
            Includes {item.tax}% tax
          </span>
        )}
      </div>
      <div className="text-end font-normal text-base text-brand-dark shrink-0 ml-2">
        {lineTotal}
      </div>
    </div>
  );
};
