import { CategoriesQueryOptionsType, Category } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategories = async () => {
  const { data } = await http.get(API_RESOURCES.CATEGORIES);
  return data as Category[];
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: ['all categries', options],
    queryFn: fetchCategories,
  });
};
