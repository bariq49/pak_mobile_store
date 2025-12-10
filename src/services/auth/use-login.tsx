"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";
import { useUI } from "@/hooks/use-UI";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface LoginResponse {
  token: string;
  user?: any;
  data?: any;
  message?: string;
}

// API Call
async function loginApi(input: LoginInputType): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>(API_RESOURCES.LOGIN, input);
  return data;
}

// Custom Mutation
export const useLoginMutation = (onReset?: () => void) => {
  const { closeModal } = useModal();
  const { authorize } = useUI();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, any, LoginInputType>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      Cookies.set("auth_token", data?.data?.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      toast.success(data?.message || "Login successful");
      authorize();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      closeModal();
      if (onReset) onReset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });
};
