"use client";

import { useMutation } from "@tanstack/react-query";
import http from "@/services/utils/http";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useUI } from "@/hooks/use-UI";
import { useForm } from "react-hook-form";
import { API_RESOURCES } from "../utils/api-endpoints";

// Input and response types
export interface UpdatePasswordInputType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface UpdatePasswordResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: any;
  };
}

// API function
async function updatePasswordApi(input: UpdatePasswordInputType): Promise<UpdatePasswordResponse> {
  const { data } = await http.patch<UpdatePasswordResponse>(API_RESOURCES.CHANGE_PASSWORD,input);
  return data;
}

// Mutation hook
export const useUpdatePasswordMutation = (onReset?: () => void) => {
  const { authorize } = useUI();

  return useMutation<UpdatePasswordResponse, any, UpdatePasswordInputType>({
    mutationFn: updatePasswordApi,
    onSuccess: (res) => {
      Cookies.set("user_token", res.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      toast.success(res.message || "Password updated successfully!");
      authorize();
      if (onReset) onReset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update password.";
      toast.error(message);
    },
  });
};

// Form hook
export const useUpdatePasswordForm = () => {
  const formMethods = useForm<UpdatePasswordInputType>({
    mode: "all",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });
  const { mutate: updatePassword, isPending } = useUpdatePasswordMutation(() =>
    formMethods.reset()
  );
  const onSubmit = (values: UpdatePasswordInputType) => {
    updatePassword(values);
  };
  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};
