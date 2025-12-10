import { Category } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

// Pure fetch function
export const getCategories = async (): Promise<Category[]> => {
  const res = await http.get(API_RESOURCES.CATEGORIES);
  return res?.data?.data?.categories as Category[];
};

// React Query hook
export const useCategories = (reactQueryOptions: Record<string, any> = {}) => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
    ...reactQueryOptions,
  });
};
