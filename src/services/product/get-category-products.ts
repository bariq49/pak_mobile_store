// services/product/get-category-products.ts
import { PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

type QueryParams = Record<string, string | string[] | number | boolean>;

const getCategoryProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<
  ["category-products", string, string, number, QueryParams],
  number
>): Promise<PaginatedProduct> => {
  const [, parentSlug, childSlug, limit, queryParamsObj] = queryKey;

  const params = new URLSearchParams();

  // Add all query parameters
  for (const [key, value] of Object.entries(queryParamsObj || {})) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }

  // Always add pagination
  params.set("page", String(pageParam));
  params.set("limit", String(limit));

  // Add parent and child slugs
  if (parentSlug) params.set("parent", parentSlug);
  if (childSlug) params.set("child", childSlug);

  const { data } = await http.get(
    `${API_RESOURCES.PRODUCTS_BY_SUB_CATEGORIES}?${params.toString()}`
  );

  // Extract data from the API response structure (assuming similar structure to shop products)
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

export const useCategoryProductsQuery = (
  categorySlug: string,
  limit: number,
  queryParamsObj: QueryParams = {}
) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["category-products", string, string, number, QueryParams],
    number
  >({
    queryKey: [
      "category-products",
      categorySlug,
      "", // child slug is empty for category page
      limit,
      queryParamsObj,
    ],
    queryFn: getCategoryProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paginatorInfo.nextPage;
    },
  });
};

