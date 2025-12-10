// services/product/get-shop-products.ts
import { PaginatedProduct, ProductsResponse } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

type QueryParams = Record<string, string | string[] | number | boolean>;

const getShopProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<
  ["shop-products", number, QueryParams],
  number
>): Promise<PaginatedProduct> => {
  const [, limit, queryParamsObj] = queryKey;

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

  const { data } = await http.get<ProductsResponse>(
    `${API_RESOURCES.PRODUCTS}?${params.toString()}`
  );
  console.log("data resposnse", data);
  // Extract data from the API response structure
  const products = data.data.products || [];
  console.log("products", products);
  const pagination = data.data.pagination || {
    total: 0,
    page: 1,
    pages: 1,
    limit: 12,
  };

  return {
    data: products,
    paginatorInfo: {
      nextPage: pagination.page < pagination.pages ? pagination.page + 1 : null,
      total: pagination.total,
    },
  };
};

export const useShopProductsQuery = (
  limit: number,
  queryParamsObj: QueryParams = {}
) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["shop-products", number, QueryParams],
    number
  >({
    queryKey: ["shop-products", limit, queryParamsObj],
    queryFn: getShopProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paginatorInfo.nextPage;
    },
  });
};
