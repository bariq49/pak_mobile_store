import { QueryOptionsType, PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  QueryKey,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

const fetchPaginatedProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<QueryKey, number>): Promise<PaginatedProduct> => {
  const [, options] = queryKey as ["products_by_category", QueryOptionsType];
  const { limit = 10, sort_by } = options;

  let sortParam = "";
  if (sort_by === "price") sortParam = "price";
  else if (sort_by === "name") sortParam = "name";

  const { data } = await http.get(API_RESOURCES.PRODUCTS_BY_CATEGORIES, {
    params: {
      page: pageParam,
      limit,
      sort: sortParam,
    },
  });

  return {
    data: data.data.products,
    paginatorInfo: {
      nextPage:
        pageParam < Math.ceil(data.results / limit) ? pageParam + 1 : null,
      total: data.results,
    },
  };
};

export const usePaginatedProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct, number>,
    QueryKey,
    number
  >({
    queryKey: ["products_by_category", options],
    queryFn: fetchPaginatedProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};
