import { QueryOptionsType, Product } from '@/services/types';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useQuery} from '@tanstack/react-query';
import shuffle from "lodash/shuffle";

const fetchProducts = async (options: QueryOptionsType) => {
  const { data } = await http.get(API_RESOURCES.PRODUCTS);
  return shuffle(data) as Product[];
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", options],
    queryFn: () => fetchProducts(options),
  });
};

export { useProductsQuery, fetchProducts };
