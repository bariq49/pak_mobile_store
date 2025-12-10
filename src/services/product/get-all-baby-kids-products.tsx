import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchBabyKidsProducts = async ({ queryKey }: any) => {
  const { data } = await http.get(API_RESOURCES.BABY_KIDS_PRODUCTS);
  return data as Product[];
};

export const useBabyKidsProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.BABY_KIDS_PRODUCTS, options],
    queryFn: () => fetchBabyKidsProducts(options),
  });
};
