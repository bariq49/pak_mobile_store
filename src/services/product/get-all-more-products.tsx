import { QueryOptionsType, PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  QueryKey,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

const fetchProducts = async ({
  queryKey,
  pageParam = 1, // page starts at 1
}: QueryFunctionContext<QueryKey, number>): Promise<PaginatedProduct> => {
  const [, options] = queryKey as ["load-products", QueryOptionsType];
  const { limit = 10, sort_by } = options;

  // Map frontend sort key to backend query format if needed
  let sortParam = "";
  if (sort_by === "price") sortParam = "price";
  else if (sort_by === "name") sortParam = "name";
  else sortParam = ""; // backend default

  // Request backend paginated products
  const { data } = await http.get(API_RESOURCES.PRODUCTS, {
    params: {
      page: pageParam,
      limit,
      sort: sortParam,
    },
  });

  // `data` from backend already contains paginated results
  return {
    data: data.data.products,
    paginatorInfo: {
      nextPage:
        pageParam < Math.ceil(data.results / limit) ? pageParam + 1 : null,
      total: data.results,
    },
  };
};

export const useMoreProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct, number>,
    QueryKey,
    number
  >({
    queryKey: ["load-products", options],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};
