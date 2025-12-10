// services/product/get-related-products.ts
import { PaginatedProduct, ProductsResponse } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

type QueryParams = Record<string, string | string[] | number | boolean>;

const getRelatedProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<
  ["related-products", string, number, QueryParams],
  number
>): Promise<PaginatedProduct> => {
  const [, slug, limit, queryParamsObj] = queryKey;

  const params = new URLSearchParams();

  // Add query parameters if available
  for (const [key, value] of Object.entries(queryParamsObj || {})) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }

  // Pagination params
  params.set("page", String(pageParam));
  params.set("limit", String(limit));

  const { data } = await http.get<ProductsResponse>(
    `${API_RESOURCES.PRODUCTS}/${slug}/related?${params.toString()}`
  );

  // Extract products and pagination
  const products = data.data.products || [];
  const pagination = data.data.pagination || {
    total: 0,
    page: 1,
    pages: 1,
    limit: limit,
  };

  return {
    data: products,
    paginatorInfo: {
      nextPage: pagination.page < pagination.pages ? pagination.page + 1 : null,
      total: pagination.total,
    },
  };
};

export const useRelatedProductsQuery = (
  slug: string,
  limit: number,
  queryParamsObj: QueryParams = {}
) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["related-products", string, number, QueryParams],
    number
  >({
    queryKey: ["related-products", slug, limit, queryParamsObj],
    queryFn: getRelatedProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paginatorInfo.nextPage;
    },
  });
};
