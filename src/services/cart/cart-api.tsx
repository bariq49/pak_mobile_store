"use client";

import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                                🔹 FETCH CART                               */
/* -------------------------------------------------------------------------- */
const fetchCart = async () => {
  const { data } = await http.get(API_RESOURCES.CART);
  console.log("Fetched Cart Data:", data.data);
  return data?.data;
};

const useCartQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.CART],
    queryFn: fetchCart,
  });
};

/* -------------------------------------------------------------------------- */
/*                              🔹 ADD TO CART                                */
/* -------------------------------------------------------------------------- */
const addToCart = async ({
  productId,
  quantity = 1,
}: {
  productId: string | number;
  quantity?: number;
}) => {
  const { data } = await http.post(`${API_RESOURCES.CART}/add`, {
    productId,
    quantity,
  });
  return data?.data?.cart;
};

const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
    onError: () => {
      toast.error("Failed to add item to cart");
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             🔹 UPDATE CART ITEM                            */
/* -------------------------------------------------------------------------- */
const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const { data } = await http.patch(
    `${API_RESOURCES.CART}/update/${productId}`,
    { quantity }
  );
  return data?.data?.cart;
};

const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                            🔹 REMOVE CART ITEM                             */
/* -------------------------------------------------------------------------- */
const removeFromCart = async (productId: string | number) => {
  const { data } = await http.delete(
    `${API_RESOURCES.CART}/remove/${productId}`
  );
  return data?.data?.cart;
};

const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                🔹 CLEAR CART                               */
/* -------------------------------------------------------------------------- */
const clearCart = async () => {
  const { data } = await http.delete(`${API_RESOURCES.CART}/clear`);
  return data?.data?.cart || { items: [] };
};

const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              🔹 APPLY COUPON                               */
/* -------------------------------------------------------------------------- */
const applyCoupon = async (code: string) => {
  const { data } = await http.post(`${API_RESOURCES.CART}/apply-coupon`, {
    code,
  });
  return data?.data?.cart;
};

const useApplyCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to apply coupon");
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             🔹 REMOVE COUPON                               */
/* -------------------------------------------------------------------------- */
const removeCoupon = async () => {
  const { data } = await http.delete(`${API_RESOURCES.CART}/remove-coupon`);
  return data?.data?.cart;
};

const useRemoveCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove coupon");
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                    🔹 SET PAYMENT METHOD (Card / COD)                      */
/* -------------------------------------------------------------------------- */
const setPaymentMethod = async (method: "stripe" | "cod") => {
  const { data } = await http.patch(
    `${API_RESOURCES.CART}/set-payment-method`,
    {
      method,
    }
  );
  return data?.data;
};

const useSetPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setPaymentMethod,
    onSuccess: (cart) => {
      toast.success(
        `Payment method updated to ${cart?.paymentMethod?.toUpperCase()}`
      );
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.CART] });
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
  useCartQuery,
  useAddToCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
  useApplyCoupon,
  useRemoveCoupon,
  useSetPaymentMethod,
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  setPaymentMethod,
};
