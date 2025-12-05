import { QueryOptionsType, Category } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchElectronictablesCategory = async ({ queryKey }: any) => {
  const { data } = await http.get(API_RESOURCES.ELECTRONIC_CATEGORY);
  return data as Category[];
};
export const useElectronicCategoryQuery = (options: QueryOptionsType) => {
  
  return useQuery<Category[], Error>({
    queryKey: [API_RESOURCES.ELECTRONIC_CATEGORY, options],
    queryFn: () => fetchElectronictablesCategory(options),
  });
};
