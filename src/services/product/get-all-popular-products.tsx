import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchPopularProducts = async ({ queryKey }: any) => {
  const { data } = await http.get(API_RESOURCES.POPULAR_PRODUCTS);
  return data as Product[];
};

export const usePopularProductsQuery = (options?: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.POPULAR_PRODUCTS, options],
    queryFn: () => fetchPopularProducts(options),
  });
};
