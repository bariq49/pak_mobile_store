import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import shuffle from 'lodash/shuffle';

export const fetchFashionProducts = async ({ queryKey }: any) => {

  const { data } = await http.get(API_RESOURCES.FASHION_PRODUCTS);
  return shuffle(data) as Product[];
};
export const usefashionProductsQuery = (options: QueryOptionsType) => {

  return useQuery<Product[], Error>({
        queryKey:[API_RESOURCES.FASHION_PRODUCTS, options],
        queryFn: () =>  fetchFashionProducts(options)
    });
};