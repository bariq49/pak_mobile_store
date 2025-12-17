import { useQuery } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";

export interface DealProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  sale_price?: number;
  discountedPrice?: number;
  /** Backend-computed original (effective) unit price before any deal, used for strike-through and subtotals. */
  originalPrice?: number | null;
  /** Backend-computed deal unit price when a deal is applied; null or >= originalPrice when no active deal. */
  dealPrice?: number | null;
}

export interface Deal {
  _id: string;
  title: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  products?: DealProduct[];
  image?: {
    mobile?: { url: string };
    desktop?: { url: string };
  };
}

interface DealsResponse {
  status: string;
  message: string;
  data: {
    deals: Deal[];
  };
}

const fetchDeals = async (): Promise<Deal[]> => {
  const { data } = await http.get<DealsResponse>(API_RESOURCES.DEALS);
  return data.data.deals || [];
};

export const useDealsQuery = () => {
  return useQuery<Deal[], Error>({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });
};
