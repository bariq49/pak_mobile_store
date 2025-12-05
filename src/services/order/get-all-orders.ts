import { QueryOptionsType, Order } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

const fetchOrders = async () => {
  const { data } = await http.get(API_RESOURCES.ORDERS);
  return {
    data: data,
  };
};

const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDERS, options],
    queryFn: fetchOrders,
  });
};

export { useOrdersQuery, fetchOrders };
