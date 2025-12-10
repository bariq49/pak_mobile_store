import { useQuery } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "../utils/api-endpoints";

export interface User {
  defaultAddress: boolean;
  postalCode: string;
  apartment: string;
  streetAddress: string;
  area: string;
  city: string;
  state: string;
  country: string;
  id: string;
  name: string;
  email: string;
  address: string;
  completeAddress: string;
  dateOfBirth: string;
  gender?: string;
  phoneNumber: string;
  avatar?: string;
}

const fetchUser = async (): Promise<User> => {
  const res = await http.get(API_RESOURCES.USER);
  return res?.data?.data?.user || {};
};

export const useCustomerQuery = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
  });
};
