import { QueryOptionsType, ProductsResponse } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import { useQuery } from "@tanstack/react-query";

const getProductsByParentCategory = async (
  options: QueryOptionsType
): Promise<ProductsResponse> => {
  const { parent, child, limit = 10 } = options;

  // Build params object, only include child if it's provided and not empty
  const params: Record<string, any> = { parent, limit };
  if (child && child.trim() !== "") {
    params.child = child;
  }

  const { data } = await http.get(API_RESOURCES.PRODUCTS_BY_SUB_CATEGORIES, {
    params,
  });

  return {
    products: data.data.products,
    pagination: data.data.pagination,
  };
};

export const useProductsByParentCategory = (options: QueryOptionsType) => {
  return useQuery({
    queryKey: ["products-by-parent-category", options],
    queryFn: () => getProductsByParentCategory(options),
    staleTime: 1000 * 60,
    retry: 2,
  });
};
