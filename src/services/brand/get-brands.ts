import { Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export interface Brand {
  name: string;
  slug: string;
  productCount?: number;
}

/**
 * Fetch all products and extract unique brands
 * Optimized: Fetches multiple pages to get all brands
 */
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const brandMap = new Map<string, { name: string; count: number }>();
    let page = 1;
    let hasMore = true;
    const limit = 100; // Fetch 100 products per page

    // Fetch products in batches to extract all brands
    while (hasMore && page <= 10) { // Limit to 10 pages to avoid infinite loops
      const { data } = await http.get(API_RESOURCES.PRODUCTS, {
        params: { page, limit },
      });

      const products: Product[] = data?.data?.products || [];
      const pagination = data?.data?.pagination;

      // Extract brands from current batch
      products.forEach((product) => {
        if (product.brand && typeof product.brand === "string" && product.brand.trim() !== "") {
          const brandName = product.brand.trim();
          const existing = brandMap.get(brandName);
          if (existing) {
            existing.count += 1;
          } else {
            brandMap.set(brandName, {
              name: brandName,
              count: 1,
            });
          }
        }
      });

      // Check if there are more pages
      if (pagination && pagination.page < pagination.pages) {
        page++;
      } else {
        hasMore = false;
      }
    }

    // Convert to array and create slugs
    const brands: Brand[] = Array.from(brandMap.values())
      .map((brand) => ({
        name: brand.name,
        slug: brand.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        productCount: brand.count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

/**
 * React Query hook for brands
 */
export const useBrands = (reactQueryOptions: Record<string, any> = {}) => {
  return useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    ...reactQueryOptions,
  });
};

