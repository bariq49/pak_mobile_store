"use client";

import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                                🔹 FETCH CART                               */
/* -------------------------------------------------------------------------- */
const fetchCart = async (userId?: string | null) => {
  // Build URL with userId if provided
  let url = API_RESOURCES.CART;
  if (userId) {
    url = `${API_RESOURCES.CART}?userId=${userId}`;
  }
  
  const response = await http.get(url);
  const { data } = response;
  
  // Get current user ID from cart response or try to extract from token
  // Only access cookies on client side to avoid hydration issues
  // Use the passed userId parameter, or try to extract from response/token
  let extractedUserId = userId || data?.data?.userId || data?.data?.user?.id || data?.data?.user?._id || null;
  
  // If not in response, try to get from token (client-side only)
  if (!extractedUserId && typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const userToken = document.cookie.split('; ').find(row => row.startsWith('user_token='))?.split('=')[1];
      if (userToken && userToken.includes('.')) {
        // Try JWT decode
        const payload = JSON.parse(atob(userToken.split('.')[1]));
        extractedUserId = payload?.id || payload?.userId || payload?.user?.id || payload?._id || null;
      }
    } catch (e) {
      // Token might not be JWT format, ignore
    }
  }
  
  // Handle different response structures
  // Backend might return: { data: { items: [...] } } OR { items: [...] }
  const cartData = data?.data || data;
  
  return cartData;
};

const useCartQuery = (userId?: string | null) => {
  return useQuery({
    queryKey: [API_RESOURCES.CART, userId],
    queryFn: () => fetchCart(userId),
    // Always enabled - backend can use token if userId not provided
    // But including userId in query ensures tax is returned
  });
};

/* -------------------------------------------------------------------------- */
/*                              🔹 ADD TO CART                                */
/* -------------------------------------------------------------------------- */
const addToCart = async ({
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

  const { data } = await http.post(`${API_RESOURCES.CART}/add`, requestBody);
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
  identifier,
  quantity,
}: {
  identifier: string | number | { productId: string | number; variantId?: string | number | null };
  quantity: number;
}) => {
  // Handle different identifier formats (same as removeFromCart)
  let url = `${API_RESOURCES.CART}/update/`;
  
  if (typeof identifier === 'object' && identifier !== null && 'productId' in identifier) {
    // For variant items, we need both productId and variantId
    if (identifier.variantId) {
      url += `${identifier.productId}?variantId=${identifier.variantId}`;
    } else {
      url += identifier.productId;
    }
  } else {
    // Simple identifier (string or number)
    url += identifier;
  }
  
  const { data } = await http.patch(url, { quantity });
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
const removeFromCart = async (identifier: string | number | { productId: string | number; variantId?: string | number | null }) => {
  // Handle different identifier formats:
  // 1. Backend cart item _id (most reliable) - use directly
  // 2. Object with productId and optional variantId - use productId in URL, variantId in body or query
  // 3. Simple productId string/number (legacy) - use directly
  
  let url = `${API_RESOURCES.CART}/remove/`;
  let requestBody: any = undefined;
  
  if (typeof identifier === 'object' && identifier !== null && 'productId' in identifier) {
    // For variant items, we need both productId and variantId
    url += identifier.productId;
    if (identifier.variantId) {
      // Try variantId as query parameter first (common REST pattern)
      url += `?variantId=${identifier.variantId}`;
      // Alternative: could also send in request body if backend prefers that
      // requestBody = { variantId: identifier.variantId };
    }
  } else {
    // Simple identifier (string or number) - backend _id or productId
    url += identifier;
  }
  
  // DELETE requests typically don't have a body, but some APIs accept it
  // If needed, we can modify this to send body for variant items
  const { data } = await http.delete(url, requestBody ? { data: requestBody } : undefined);
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
