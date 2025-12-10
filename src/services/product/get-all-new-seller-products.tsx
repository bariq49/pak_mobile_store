import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchNewSellerProducts = async (options: QueryOptionsType) => {
  const { data } = await http.get(API_RESOURCES.NEW_SELLER_PRODUCTS); // Updated endpoint
  return data.data.products as Product[]; // Adjusted to match the API response structure
};

export const useNewSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.NEW_SELLER_PRODUCTS, options], // Updated key
    queryFn: () => fetchNewSellerProducts(options),
  });
};
