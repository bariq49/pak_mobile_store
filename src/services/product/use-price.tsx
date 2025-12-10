import { useMemo } from "react";

// Basic price formatting function
export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}): string {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatCurrency.format(amount);
}

// Variant price formatting with discount calculation
export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}): {
  price: string;
  basePrice: string | null;
  discount: string | null;
} {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  return { price, basePrice, discount };
}

// Price hook with AED as fixed currency
export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
  } | null
): {
  price: string;
  basePrice: string | null;
  discount: string | null;
} {
  const { amount, baseAmount } = data ?? {};
  const locale = "en";
  const currencyCode = "SAR";

  const value = useMemo(() => {
    if (typeof amount !== "number") return "";

    return baseAmount !== undefined
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale });
  }, [amount, baseAmount]);

  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null }
    : value;
}
