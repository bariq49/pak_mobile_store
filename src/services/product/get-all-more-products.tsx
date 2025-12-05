import { QueryOptionsType,  PaginatedProduct } from '@/services/types';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useInfiniteQuery, QueryKey, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
import shuffle from "lodash/shuffle";

const fetchProducts = async ({
                               queryKey,
                               pageParam = 1,
                             }: QueryFunctionContext<QueryKey, number>): Promise<PaginatedProduct> => {

  try {
    const [, options] = queryKey as ['load-products', QueryOptionsType];
    const { limit = 10, sort_by } = options; // Default limit to 10 if undefined
    
    // Simulate pagination
    const startIndex = (pageParam - 1) * limit;
    const endIndex = startIndex + limit;
    let { data } = await http.get(API_RESOURCES.PRODUCTS);
    
    // Apply sorting if sort_by is provided (example: sort by price)
    if (sort_by === 'price') {
      data = [...data].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort_by === 'name') {
      data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      data = shuffle(data); // Shuffle if no sorting specified
    }
    
    // Slice the data based on pagination
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      paginatorInfo: {
        nextPage: endIndex < data.length ? pageParam + 1 : null, // Next page if more data exists
        total: data.length, // Total number of products
      },
    };
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

const useMoreProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error, InfiniteData<PaginatedProduct, number>, QueryKey, number>({
    queryKey: ['load-products', options],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};

export { useMoreProductsQuery, fetchProducts };
