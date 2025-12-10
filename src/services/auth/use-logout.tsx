"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import http from "../utils/http";
import { API_RESOURCES } from "../utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useUI } from "@/hooks/use-UI";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useCartStore } from "@/stores/useCartStore";

interface LogoutResponse {
  ok: boolean;
  message: string;
}

async function logoutApi(): Promise<LogoutResponse> {
  const { data } = await http.get(API_RESOURCES.LOGOUT);
  return data;
}

export const useLogoutMutation = () => {
  const { unauthorize } = useUI();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, Error>({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      Cookies.remove("auth_token");
      unauthorize();
      queryClient.clear();
      const { resetCart } = useCartStore.getState();
      resetCart();

      toast.success(data?.message || "Logout successful!");
      router.push(ROUTES.HOME);
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed!");
    },
  });
};
