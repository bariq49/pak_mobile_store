"use client";

import { useMutation } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

export interface ResetPasswordInputType {
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordResponse {
  token: string;
  message: string;
}

// API function
async function resetPasswordApi({
  token,
  password,
  passwordConfirm,
}: {
  token: string;
  password: string;
  passwordConfirm: string;
}): Promise<ResetPasswordResponse> {
  const { data } = await http.patch(
    `${API_RESOURCES.RESET_PASSWORD}/${token}`,
    { password, passwordConfirm }
  );
  return data;
}

// Mutation hook
export const useResetPasswordMutation = (onReset?: () => void) => {
  const router = useRouter();

  return useMutation<
    ResetPasswordResponse,
    any,
    { token: string; password: string; passwordConfirm: string }
  >({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successfully!");
      router.push(ROUTES.HOME);
      if (onReset) onReset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(message);
    },
  });
};
