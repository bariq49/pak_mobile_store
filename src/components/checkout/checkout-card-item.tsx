"use client";
import { Item } from "@/services/utils/cartUtils";
import Image from "@/components/shared/image";
import React from "react";
import { productPlaceholder } from "@/assets/placeholders";
import { useProductPricing } from "@/utils/pricing";
import usePrice from "@/services/product/use-price";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const quantity = item.quantity ?? 1;

  // Extract sale_price from item if available
  const sale_price = item.sale_price ?? null;
  
  // For sales: if originalPrice is not provided but sale_price exists and is less than price,
  // then price is the original and sale_price is the sale price
  // For deals: originalPrice and dealPrice are provided by backend
  const effectiveOriginalPrice = item.originalPrice ?? 
    (sale_price && sale_price < item.price ? item.price : null);
  const effectiveSalePrice = sale_price && sale_price < item.price ? sale_price : null;
  
  // Use comprehensive pricing logic that handles both deals and sales
  const productPricing = useProductPricing({
    originalPrice: effectiveOriginalPrice,
    dealPrice: item.dealPrice ?? null,
    price: item.price ?? null,
    sale_price: effectiveSalePrice,
  });

  // Use the formatted prices directly from useProductPricing
  const unitPrice = productPricing.price;
  const basePrice = productPricing.basePrice;

  // Calculate effective unit price for line total
  const effectiveUnit = productPricing.effectivePrice;

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
