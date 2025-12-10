import { QueryOptionsType, ProductsResponse } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import { useQuery } from "@tanstack/react-query";

const getProductsByParentCategory = async (
  options: QueryOptionsType
): Promise<ProductsResponse> => {
  const { parent, child, limit = 10 } = options;

  const { data } = await http.get(API_RESOURCES.PRODUCTS_BY_SUB_CATEGORIES, {
    params: { parent, child, limit },
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
