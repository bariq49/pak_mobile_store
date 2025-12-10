"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";
import { useUI } from "@/hooks/use-UI";

export interface SignUpInputType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  remember_me: boolean;
}

export interface SignUpResponse {
  token: string;
  user?: any;
  data?: any;
  message?: string;
}

// API function
async function signUpApi(input: SignUpInputType): Promise<SignUpResponse> {
  const { data } = await http.post<SignUpResponse>(API_RESOURCES.SIGNUP, input);
  return data;
}

// Mutation hook
export const useSignUpMutation = (onReset?: () => void) => {
  const { closeModal } = useModal();
  const { authorize } = useUI();
  const queryClient = useQueryClient();

  return useMutation<SignUpResponse, any, SignUpInputType>({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      Cookies.set("auth_token", data?.data?.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      toast.success(data?.message || "Signup successful");
      authorize();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      closeModal();
      if (onReset) onReset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    },
  });
};
