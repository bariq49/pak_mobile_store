// src/services/product/get-products.ts
import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/http";
import { useQuery } from "@tanstack/react-query";
import { API_RESOURCES } from "../utils/api-endpoints";

export const fetchProductsByCategory = async ({ queryKey }: any) => {
  const [_key, { categorySlug, subCategorySlug, limit }] = queryKey;

  // Choose correct endpoint
  const endpoint = `${API_RESOURCES.PRODUCTS_BY_CATEGORIES}/${categorySlug}/${subCategorySlug}`;
  const { data } = await http.get(endpoint, { params: { limit } });
  return data?.data?.products || [];
};

export const useProductsQueryByCategories = (
  options: QueryOptionsType & { categorySlug: string; subCategorySlug?: string }
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products-by-category", options],
    queryFn: fetchProductsByCategory,
    enabled: !!options.categorySlug,
  });
};
