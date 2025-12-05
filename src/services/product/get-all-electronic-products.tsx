import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import shuffle from 'lodash/shuffle';

export const fetchElectronictablesProducts = async ({ queryKey }: any) => {

  const { data } = await http.get(API_RESOURCES.ELETRONIC_PRODUCTS);
  return shuffle(data) as Product[];
};
export const useElectronicProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.ELETRONIC_PRODUCTS, options],
    queryFn: () => fetchElectronictablesProducts(options),
  });
 
};
