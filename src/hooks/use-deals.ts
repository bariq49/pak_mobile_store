import { useMemo } from "react";
import { useDealsQuery, Deal } from "@/services/deals/get-banner-deals";

export type DealVariant = "MAIN" | "FLASH" | "SUPER" | "MEGA" | string;

export interface NormalizedDeal {
  _id: string;
  title: string;
  description?: string;
  dealVariant: DealVariant;
  imageMobile?: string;
  imageDesktop?: string;
  ctaText?: string;
  ctaUrl?: string;
  raw: Deal;
}

export interface UseDealsResult {
  mainDeals: NormalizedDeal[];
  specialDeals: NormalizedDeal[];
  isLoading: boolean;
  isError: boolean;
}

function normalizeDeal(deal: Deal): NormalizedDeal {
  // Normalize variant to uppercase string with fallback
  const rawVariant = (deal as any).dealVariant ?? (deal as any).variant;
  const dealVariant: DealVariant = typeof rawVariant === "string"
    ? (rawVariant.toUpperCase() as DealVariant)
    : "MAIN";

  // Prefer explicit CTA text / URL fields; fall back to hero-style fields
  const ctaText =
    (deal as any).ctaText ??
    (deal as any).buttonText ??
    (deal as any).btnText ??
    "Shop Now";

  const ctaUrl =
    (deal as any).ctaUrl ??
    (deal as any).buttonUrl ??
    (deal as any).btnUrl ??
    (deal.products && deal.products[0]
      ? `/product/${deal.products[0].slug || deal.products[0]._id}`
      : undefined);

  return {
    _id: deal._id,
    title: deal.title,
    description: deal.description,
    dealVariant,
    imageMobile: deal.image?.mobile?.url,
    imageDesktop: deal.image?.desktop?.url,
    ctaText,
    ctaUrl,
    raw: deal,
  };
}

export const useDeals = (): UseDealsResult => {
  const { data, isLoading, isError } = useDealsQuery();

  const { mainDeals, specialDeals } = useMemo(() => {
    if (!data || !data.length) {
      return { mainDeals: [] as NormalizedDeal[], specialDeals: [] as NormalizedDeal[] };
    }

    const normalized = data.map(normalizeDeal);
    const mainDeals = normalized.filter((d) => d.dealVariant === "MAIN");
    const specialDeals = normalized.filter((d) => d.dealVariant !== "MAIN");

    return { mainDeals, specialDeals };
  }, [data]);

  return {
    mainDeals,
    specialDeals,
    isLoading,
    isError,
  };
};


