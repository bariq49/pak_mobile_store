import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchBestSellerProducts = async (options: QueryOptionsType) => {
  const { data } = await http.get(API_RESOURCES.BEST_SELLER_PRODUCTS);
  return (data.data?.products as Product[]) || (data as Product[]);
};

export const useBestSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.BEST_SELLER_PRODUCTS, options],
    queryFn: () => fetchBestSellerProducts(options),
  });
};
