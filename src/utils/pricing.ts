import usePrice, { formatPrice as rawFormatPrice } from "@/services/product/use-price";

export interface DealPricingInput {
  originalPrice: number | null | undefined;
  dealPrice: number | null | undefined;
}

export function hasActiveDeal({ originalPrice, dealPrice }: DealPricingInput): boolean {
  if (originalPrice == null || dealPrice == null) return false;
  if (originalPrice <= 0) return false;
  return dealPrice > 0 && dealPrice < originalPrice;
}

export function getEffectiveUnitPrice({ originalPrice, dealPrice }: DealPricingInput): number {
  if (hasActiveDeal({ originalPrice, dealPrice })) {
    return Number(dealPrice);
  }
  return Number(originalPrice ?? 0);
}

export function getDiscountPercent({ originalPrice, dealPrice }: DealPricingInput): number | null {
  if (!hasActiveDeal({ originalPrice, dealPrice })) return null;
  const base = Number(originalPrice);
  const deal = Number(dealPrice);
  if (!isFinite(base) || base <= 0) return null;
  const percent = ((base - deal) / base) * 100;
  if (!isFinite(percent) || percent <= 0) return null;
  return Math.round(percent);
}

export function formatCurrency(amount: number): string {
  return rawFormatPrice({
    amount,
    currencyCode: "EUR",
    locale: "en",
  });
}

export function useDealAwarePrice(input: DealPricingInput) {
  const effective = getEffectiveUnitPrice(input);
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

  const discountPercent = getDiscountPercent(input);

  return {
    price,
    basePrice: activeDeal ? basePrice : null,
    hasDeal: activeDeal,
    discountPercent,
    effectivePrice: effective,
  };
}


