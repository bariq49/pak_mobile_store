import { Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchProduct = async (_slug: string) => {
  const { data } = await http.get(`${API_RESOURCES.PRODUCT}`);
  return data;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: [API_RESOURCES.PRODUCT, slug],
    queryFn: () => fetchProduct(slug),
  });
};
