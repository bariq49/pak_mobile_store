import usePrice, { formatPrice as rawFormatPrice } from "@/services/product/use-price";

export interface DealPricingInput {
  originalPrice: number | null | undefined;
  dealPrice: number | null | undefined;
}

export interface SalePricingInput {
  price: number | null | undefined;
  sale_price: number | null | undefined;
}

export interface ComprehensivePricingInput extends DealPricingInput, SalePricingInput {}

export function hasActiveDeal({ originalPrice, dealPrice }: DealPricingInput): boolean {
  if (originalPrice == null || dealPrice == null) return false;
  if (originalPrice <= 0) return false;
  return dealPrice > 0 && dealPrice < originalPrice;
}

export function hasActiveSale({ price, sale_price }: SalePricingInput): boolean {
  if (price == null || sale_price == null) return false;
  if (price <= 0) return false;
  return sale_price > 0 && sale_price < price;
}

export function getEffectiveUnitPrice(input: ComprehensivePricingInput): number {
  // Priority 1: Check for active deal (deal takes priority over sale)
  if (hasActiveDeal({ originalPrice: input.originalPrice, dealPrice: input.dealPrice })) {
    return Number(input.dealPrice);
  }
  
  // Priority 2: Check for active sale
  if (hasActiveSale({ price: input.price, sale_price: input.sale_price })) {
    return Number(input.sale_price);
  }
  
  // Priority 3: Use originalPrice if available (from deal context)
  if (typeof input.originalPrice === "number" && input.originalPrice > 0) {
    return Number(input.originalPrice);
  }
  
  // Priority 4: Fallback to regular price
  return Number(input.price ?? 0);
}

export function getBasePriceForDisplay(input: ComprehensivePricingInput): number | null {
  // If there's an active deal, show originalPrice as base
  if (hasActiveDeal({ originalPrice: input.originalPrice, dealPrice: input.dealPrice })) {
    return typeof input.originalPrice === "number" && input.originalPrice > 0
      ? input.originalPrice
      : null;
  }
  
  // If there's an active sale (but no deal), show price as base
  if (hasActiveSale({ price: input.price, sale_price: input.sale_price })) {
    return typeof input.price === "number" && input.price > 0 ? input.price : null;
  }
  
  return null;
}

export function getDiscountPercent(input: ComprehensivePricingInput): number | null {
  // Calculate discount for deal
  if (hasActiveDeal({ originalPrice: input.originalPrice, dealPrice: input.dealPrice })) {
    const base = Number(input.originalPrice);
    const deal = Number(input.dealPrice);
    if (!isFinite(base) || base <= 0) return null;
    const percent = ((base - deal) / base) * 100;
    if (!isFinite(percent) || percent <= 0) return null;
    return Math.round(percent);
  }
  
  // Calculate discount for sale
  if (hasActiveSale({ price: input.price, sale_price: input.sale_price })) {
    const base = Number(input.price);
    const sale = Number(input.sale_price);
    if (!isFinite(base) || base <= 0) return null;
    const percent = ((base - sale) / base) * 100;
    if (!isFinite(percent) || percent <= 0) return null;
    return Math.round(percent);
  }
  
  return null;
}

export function formatCurrency(amount: number): string {
  return rawFormatPrice({
    amount,
    currencyCode: "EUR",
    locale: "en",
  });
}

export function useDealAwarePrice(input: DealPricingInput) {
  const effective = getEffectiveUnitPrice({
    ...input,
    price: input.originalPrice,
    sale_price: null,
  });
  const activeDeal = hasActiveDeal(input);
  const { price, basePrice } = usePrice(
    activeDeal
      ? {
          amount: effective,
          baseAmount: Number(input.originalPrice ?? effective),
        }
      : {
          amount: effective,
        }
  );

  const discountPercent = getDiscountPercent({
    ...input,
    price: input.originalPrice,
    sale_price: null,
  });

  return {
    price,
    basePrice: activeDeal ? basePrice : null,
    hasDeal: activeDeal,
    discountPercent,
    effectivePrice: effective,
  };
}

/**
 * Comprehensive pricing hook that handles both Deal and Sale pricing
 * Priority: Deal > Sale > Regular Price
 */
export function useProductPricing(input: ComprehensivePricingInput) {
  const effective = getEffectiveUnitPrice(input);
  const basePrice = getBasePriceForDisplay(input);
  const hasDeal = hasActiveDeal({ originalPrice: input.originalPrice, dealPrice: input.dealPrice });
  const hasSale = hasActiveSale({ price: input.price, sale_price: input.sale_price });
  const hasDiscount = hasDeal || hasSale;
  
  const { price, basePrice: formattedBasePrice } = usePrice(
    hasDiscount && basePrice != null
      ? {
          amount: effective,
          baseAmount: basePrice,
        }
      : {
          amount: effective,
        }
  );

  const discountPercent = getDiscountPercent(input);

  return {
    price,
    basePrice: hasDiscount && formattedBasePrice ? formattedBasePrice : null,
    hasDeal,
    hasSale,
    hasDiscount,
    discountPercent,
    effectivePrice: effective,
  };
}


