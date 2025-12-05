import http from '@/services/utils/http';
import { useQuery } from '@tanstack/react-query';
import {API_RESOURCES} from "@/services/utils/api-endpoints";

const fetchOrderStatus = async () => {
  const { data } = await http.get(API_RESOURCES.ORDER_STATUS);
  return {
    data: data,
  };
};

const useOrderStatusQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDER_STATUS],
    queryFn: fetchOrderStatus,
  });
};

export { useOrderStatusQuery, fetchOrderStatus };
