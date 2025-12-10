"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "../utils/api-endpoints";
import toast from "react-hot-toast";

export interface UpdateUserType {
  name: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  avatar?: File | null;
}

async function updateUser(input: UpdateUserType) {
  const formData = new FormData();
  formData.append("name", input.name);
  formData.append("dateOfBirth", input.dateOfBirth);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("gender", input.gender);
  if (input.avatar) {
    formData.append("avatar", input.avatar);
  }
  const { data } = await http.patch(API_RESOURCES.USER, formData);
  return data.user;
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while updating profile!";
      toast.error(message);
    },
  });
};
