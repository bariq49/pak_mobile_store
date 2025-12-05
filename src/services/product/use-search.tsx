import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { useQuery } from '@tanstack/react-query';
import { API_RESOURCES } from '@/services/utils/api-endpoints';


export const fetchSearched = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const { data } = await http.get(API_RESOURCES.SEARCH);
  function searchProduct(product: any) {
    return product.name.toLowerCase().indexOf(options.text.toLowerCase()) > -1;
  }

  return data.filter(searchProduct);
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.SEARCH, options],
    queryFn: fetchSearched,
  });
};
