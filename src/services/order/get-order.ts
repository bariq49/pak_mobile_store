import { Order } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`${API_RESOURCES.ORDER}`);
  return data;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
  });
};
