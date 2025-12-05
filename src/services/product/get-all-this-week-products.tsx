import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchThisWeekProducts = async (options: QueryOptionsType) => {
  const { data } = await http.get(API_RESOURCES.THIS_WEEK_PRODUCTS);
  return data as Product[];
};

export const useThisWeekProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
        queryKey: [API_RESOURCES.THIS_WEEK_PRODUCTS, options],
        queryFn: () =>   fetchThisWeekProducts(options),
    });
};
