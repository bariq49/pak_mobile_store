import { Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";
import { convertTaxToNumber } from "@/services/utils/cartUtils";

export const fetchProduct = async (slug: string) => {
  const { data } = await http.get(`${API_RESOURCES.PRODUCTS}/${slug}`);
  const rawProduct = data.data.product;
  const product = rawProduct as Product;
  
  // Convert tax to number if it comes as string from API
  // Ensure tax is always extracted and converted
  const rawTax = rawProduct?.tax ?? product.tax;
  product.tax = convertTaxToNumber(rawTax);
  
  return product;
};

export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug),
  });
};
