"use client";

import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                            🔹 CREATE BUY NOW                               */
/* -------------------------------------------------------------------------- */
const createBuyNow = async ({
  productId,
  variantId,
  quantity = 1,
}: {
  productId: string | number;
  variantId?: string | null;
  quantity?: number;
}) => {
  const requestBody: {
    productId: string | number;
    variantId?: string | null;
    quantity: number;
  } = {
    productId,
    quantity,
  };

  // Only include variantId if it's provided (for variable products)
  if (variantId) {
    requestBody.variantId = variantId;
  }

  const { data } = await http.post(API_RESOURCES.BUY_NOW, requestBody);
  
  // Log the response for debugging
  console.log("Buy Now API Response:", data?.data?.buyNow || data?.data);
  console.log("Buy Now Full Response:", data);
  
  return data?.data?.buyNow || data?.data;
};

const useCreateBuyNow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBuyNow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create buy now item"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                            🔹 FETCH BUY NOW                                */
/* -------------------------------------------------------------------------- */
const fetchBuyNow = async () => {
  const { data } = await http.get(API_RESOURCES.BUY_NOW);
  return data?.data?.buyNow || data?.data || null;
};

const useBuyNowQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.BUY_NOW],
    queryFn: fetchBuyNow,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0, // Always consider data stale to ensure fresh fetch
  });
};

/* -------------------------------------------------------------------------- */
/*                            🔹 CLEAR BUY NOW                                 */
/* -------------------------------------------------------------------------- */
const clearBuyNow = async () => {
  const { data } = await http.delete(API_RESOURCES.BUY_NOW);
  return data?.data || null;
};

const useClearBuyNow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearBuyNow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
      toast.success("Buy now cleared");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to clear buy now"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                         🔹 APPLY COUPON (BUY NOW)                           */
/* -------------------------------------------------------------------------- */
const applyBuyNowCoupon = async (code: string) => {
  const { data } = await http.post(`${API_RESOURCES.BUY_NOW}/apply-coupon`, {
    code,
  });
  return data?.data?.buyNow || data?.data;
};

const useApplyBuyNowCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyBuyNowCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to apply coupon"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                        🔹 REMOVE COUPON (BUY NOW)                           */
/* -------------------------------------------------------------------------- */
const removeBuyNowCoupon = async () => {
  const { data } = await http.delete(
    `${API_RESOURCES.BUY_NOW}/remove-coupon`
  );
  return data?.data?.buyNow || data?.data;
};

const useRemoveBuyNowCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBuyNowCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove coupon"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                    🔹 SET SHIPPING METHOD (BUY NOW)                         */
/* -------------------------------------------------------------------------- */
const setBuyNowShippingMethod = async (
  method: "standard" | "express"
) => {
  const { data } = await http.patch(
    `${API_RESOURCES.BUY_NOW}/set-shipping-method`,
    {
      method,
    }
  );
  return data?.data?.buyNow || data?.data;
};

const useSetBuyNowShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setBuyNowShippingMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update shipping method"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                    🔹 SET PAYMENT METHOD (BUY NOW)                          */
/* -------------------------------------------------------------------------- */
const setBuyNowPaymentMethod = async (method: "stripe" | "cod") => {
  const { data } = await http.patch(
    `${API_RESOURCES.BUY_NOW}/set-payment-method`,
    {
      method,
    }
  );
  return data?.data?.buyNow || data?.data;
};

const useSetBuyNowPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setBuyNowPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.BUY_NOW] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update payment method"
      );
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               🔹 EXPORT ALL                                */
/* -------------------------------------------------------------------------- */
export {
  useCreateBuyNow,
  useBuyNowQuery,
  useClearBuyNow,
  useApplyBuyNowCoupon,
  useRemoveBuyNowCoupon,
  useSetBuyNowShippingMethod,
  useSetBuyNowPaymentMethod,
  createBuyNow,
  fetchBuyNow,
  clearBuyNow,
  applyBuyNowCoupon,
  removeBuyNowCoupon,
  setBuyNowShippingMethod,
  setBuyNowPaymentMethod,
};

