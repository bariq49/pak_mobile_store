"use client";

import { useMutation } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

export interface ForgetPasswordInput {
  email: string;
}

export interface ForgetPasswordResponse {
  ok: boolean;
  message: string;
}

// API call
async function forgetPasswordApi(
  input: ForgetPasswordInput
): Promise<ForgetPasswordResponse> {
  const { data } = await http.post<ForgetPasswordResponse>(
    API_RESOURCES.FORGOT_PASSWORD,
    input
  );
  return data;
}

export const useForgetPasswordMutation = (onReset?: () => void) => {
  const { closeModal } = useModal();

  return useMutation<ForgetPasswordResponse, unknown, ForgetPasswordInput>({
    mutationFn: forgetPasswordApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset email sent!");
      closeModal();
      if (onReset) onReset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      toast.error(message);
    },
  });
};
