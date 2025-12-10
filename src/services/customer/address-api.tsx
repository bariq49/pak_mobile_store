"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "../utils/api-endpoints";
import toast from "react-hot-toast";

// Address type
export interface Address {
  label: string;
  _id: string;
  country: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  city: string;
  area: string;
  streetAddress: string;
  apartment?: string;
  postalCode: string;
  isDefault?: boolean;
}

// 1. Add address
async function addAddress(input: Address) {
  const { data } = await http.post(API_RESOURCES.ADDRESSES, input);
  return data.address;
}
export const useAddAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add address");
    },
  });
};

//  2. Get all addresses
async function getAddresses(): Promise<Address[]> {
  const { data } = await http.get(API_RESOURCES.ADDRESSES);
  console.log(data,"address data");
  return data?.data?.addresses || [];
}
export const useAddressesQuery = () => {
  return useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};

//  3. Get default address
async function getDefaultAddress(): Promise<Address> {
  const { data } = await http.get(`${API_RESOURCES.ADDRESSES}/default`);
  return data?.address;
}
export const useDefaultAddressQuery = () => {
  return useQuery<Address>({
    queryKey: ["defaultAddress"],
    queryFn: getDefaultAddress,
  });
};

//  4. Update address
async function updateAddress({
  addressId,
  input,
}: {
  addressId: string;
  input: Partial<Address>;
}) {
  const { data } = await http.patch(
    `${API_RESOURCES.ADDRESSES}/${addressId}`,
    input
  );
  return data.address;
}
export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update address");
    },
  });
};

//  5. Delete address
async function deleteAddress(addressId: string) {
  const { data } = await http.delete(`${API_RESOURCES.ADDRESSES}/${addressId}`);
  return data.addresses;
}
export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete address");
    },
  });
};

//  6. Set default address
async function setDefaultAddress(addressId: string) {
  const { data } = await http.patch(
    `${API_RESOURCES.ADDRESSES}/${addressId}/default`
  );
  return data.address;
}
export const useSetDefaultAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      toast.success("Default address updated");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["defaultAddress"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to set default address"
      );
    },
  });
};
