import { QueryOptionsType, Category } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchTopSelltablesCategory = async ({ queryKey }: any) => {
  const { data } = await http.get(API_RESOURCES.TOPSELL_PRODUCTS);
  return data as Category[];
};
export const useTopSellProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>({
      queryKey: [API_RESOURCES.TOPSELL_PRODUCTS, options],
      queryFn: () => fetchTopSelltablesCategory(options),
    });
};
