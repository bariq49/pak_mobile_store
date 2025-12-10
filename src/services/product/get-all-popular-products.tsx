import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchPopularProducts = async ({ queryKey }: any) => {
  const { data } = await http.get(API_RESOURCES.POPULAR_PRODUCTS);
  const products = data?.data?.products;
  return products as Product[];
};

export const usePopularProductsQuery = (options?: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: ["popular-products", options],
    queryFn: () => fetchPopularProducts(options),
  });
};
