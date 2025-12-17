"use client";
import { Item } from "@/services/utils/cartUtils";
import Image from "@/components/shared/image";
import usePrice from "@/services/product/use-price";
import React from "react";
import { productPlaceholder } from "@/assets/placeholders";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const quantity = item.quantity ?? 1;

  const hasBackendDeal =
    typeof item.originalPrice === "number" &&
    item.originalPrice > 0 &&
    typeof item.dealPrice === "number" &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  const effectiveUnit =
    hasBackendDeal && typeof item.dealPrice === "number"
      ? item.dealPrice
      : item.price;

  const { price } = usePrice({
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
        {hasTax && (
          <span className="text-xs text-gray-500 mt-1">
            Includes {item.tax}% tax
          </span>
        )}
      </div>
      <div className="text-end font-normal text-base text-brand-dark shrink-0 ml-2">
        {price}
      </div>
    </div>
  );
};
