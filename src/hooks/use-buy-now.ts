import { useEffect, useState, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useBuyNowStore } from "@/stores/useBuyNowStore";
import type { BuyNowStore } from "@/stores/useBuyNowStore";
import { Product, VariationOption } from "@/services/types";
import { constructCartItem } from "@/utils/construct-cart-item";
import { Item, convertTaxToNumber } from "@/services/utils/cartUtils";
import { findMatchingVariant } from "@/services/utils/convert-variants-to-variations";
import {
  useBuyNowQuery,
  useCreateBuyNow,
  useClearBuyNow,
  useApplyBuyNowCoupon,
  useRemoveBuyNowCoupon,
  useSetBuyNowShippingMethod,
  useSetBuyNowPaymentMethod,
} from "@/services/cart/buy-now-api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";

// Type guard to check if data is a Product
function isProduct(data: Item | Product): data is Product {
  return (
    (data as Product).image !== undefined &&
    typeof (data as Product).image !== "string"
  );
}

export const useBuyNow = () => {
  const buyNowStore = useBuyNowStore(
    useShallow((state: BuyNowStore) => ({
      items: state.items,
      isEmpty: state.isEmpty,
      totalItems: state.totalItems,
      totalUniqueItems: state.totalUniqueItems,
      total: state.total,
      discount: state.discount,
      finalTotal: state.finalTotal,
      coupon: state.coupon,
      shippingFee: state.shippingFee,
      shippingMethod: state.shippingMethod,
      codFee: state.codFee,
      paymentMethod: state.paymentMethod,
      setBuyNow: state.setBuyNow,
      resetBuyNow: state.resetBuyNow,
      setPaymentMethod: state.setPaymentMethod,
    }))
  );

  const router = useRouter();

  /** React Query Hooks */
  const { data: buyNowData, isLoading: isLoadingBuyNow } = useBuyNowQuery();
  const createBuyNowMutation = useCreateBuyNow();
  const clearBuyNowMutation = useClearBuyNow();
  const applyCouponMutation = useApplyBuyNowCoupon();
  const removeCouponMutation = useRemoveBuyNowCoupon();
  const setShippingMethodMutation = useSetBuyNowShippingMethod();
  const setPaymentMethodMutation = useSetBuyNowPaymentMethod();

  // Use ref to track last synced data to prevent infinite loops
  const lastSyncedRef = useRef<string>("");

  /** Sync backend buy-now to Zustand */
  useEffect(() => {
    if (!buyNowData) {
      buyNowStore.resetBuyNow();
      lastSyncedRef.current = "";
      return;
    }

    // Create a stable key from the data to compare
    const dataKey = JSON.stringify({
      items: buyNowData.items,
      discount: buyNowData.discount,
      finalTotal: buyNowData.finalTotal,
      shippingFee: buyNowData.shippingFee,
      shippingMethod: buyNowData.shippingMethod,
      codFee: buyNowData.codFee,
      paymentMethod: buyNowData.paymentMethod,
    });

    // Only sync if data has actually changed
    if (lastSyncedRef.current === dataKey) {
      return;
    }

    // Convert tax to number for all items from backend API
    const itemsWithConvertedTax = (buyNowData.items ?? []).map((item: any) => ({
      ...item,
      tax: convertTaxToNumber(item.tax),
    }));

    buyNowStore.setBuyNow(
      itemsWithConvertedTax,
      buyNowData.discount ?? 0,
      buyNowData.coupon ?? null,
      buyNowData.finalTotal ?? undefined,
      buyNowData.shippingFee ?? 0,
      buyNowData.shippingMethod ?? "standard",
      buyNowData.codFee ?? 0,
      buyNowData.paymentMethod ?? null
    );

    lastSyncedRef.current = dataKey;
  }, [buyNowData]);

  /** 🛒 Buy Now Actions */
  const useBuyNowActions = (
    data?: Item | Product,
    selectedVariation?: VariationOption,
    selectedQuantity: number = 1
  ) => {
    const [buyNowLoader, setBuyNowLoader] = useState(false);

    const buyNow = async () => {
      if (!data) return;
      setBuyNowLoader(true);
      const item = constructCartItem(data, selectedVariation!);

      // Extract variantId for variable products
      let variantId: string | null | undefined = undefined;

      // Check if product has variants and a variation is selected
      if (
        isProduct(data) &&
        data.variants &&
        data.variants.length > 0 &&
        selectedVariation
      ) {
        // Convert selectedVariation.options to attributes object for matching
        const attributes: { [key: string]: string } = {};
        if (
          selectedVariation.options &&
          Array.isArray(selectedVariation.options)
        ) {
          selectedVariation.options.forEach((option) => {
            if (option.name && option.value) {
              attributes[option.name] = option.value;
            }
          });
        }

        // Find matching variant from product.variants array
        const matchingVariant = findMatchingVariant(data.variants, attributes);

        if (matchingVariant && matchingVariant._id) {
          variantId = matchingVariant._id;
        }
      }

      // Use productId from the product's _id or id field
      const productId = isProduct(data)
        ? data._id || data.id
        : item.productId || item.id;

      try {
        await createBuyNowMutation.mutateAsync({
          productId: productId.toString(),
          variantId: variantId,
          quantity: selectedQuantity,
        });

        // Store flag in localStorage to indicate buy-now flow
        if (typeof window !== "undefined") {
          localStorage.setItem("isBuyNow", "true");
        }

        // Small delay to ensure query refetches before redirect
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Redirect to checkout
        router.push(ROUTES.CHECKOUT);
        toast.success("Redirecting to checkout...");
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to create buy now item";
        toast.error(msg);
      } finally {
        setBuyNowLoader(false);
      }
    };

    const clearBuyNow = async () => {
      try {
        await clearBuyNowMutation.mutateAsync();
        buyNowStore.resetBuyNow();
        if (typeof window !== "undefined") {
          localStorage.removeItem("isBuyNow");
        }
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to clear buy now";
        toast.error(msg);
      }
    };

    /** Coupon actions */
    const applyCoupon = async (code: string) => {
      try {
        const updatedBuyNow = await applyCouponMutation.mutateAsync(code);
        buyNowStore.setBuyNow(
          updatedBuyNow.items,
          updatedBuyNow.discount,
          updatedBuyNow.coupon,
          updatedBuyNow.finalTotal,
          updatedBuyNow.shippingFee ?? 0,
          updatedBuyNow.shippingMethod ?? "standard",
          updatedBuyNow.codFee ?? 0,
          updatedBuyNow.paymentMethod ?? null
        );
        toast.success(`Coupon "${code}" applied successfully!`);
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to apply coupon";
        toast.error(msg);
      }
    };

    const removeCoupon = async () => {
      try {
        const updatedBuyNow = await removeCouponMutation.mutateAsync();
        buyNowStore.setBuyNow(
          updatedBuyNow.items,
          updatedBuyNow.discount,
          updatedBuyNow.coupon,
          updatedBuyNow.finalTotal,
          updatedBuyNow.shippingFee ?? 0,
          updatedBuyNow.shippingMethod ?? "standard",
          updatedBuyNow.codFee ?? 0,
          updatedBuyNow.paymentMethod ?? null
        );
        toast.success("Coupon removed successfully!");
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to remove coupon";
        toast.error(msg);
      }
    };

    const setShippingMethod = async (method: "standard" | "express") => {
      try {
        const updatedBuyNow = await setShippingMethodMutation.mutateAsync(
          method
        );
        buyNowStore.setBuyNow(
          updatedBuyNow.items,
          updatedBuyNow.discount,
          updatedBuyNow.coupon,
          updatedBuyNow.finalTotal,
          updatedBuyNow.shippingFee ?? 0,
          updatedBuyNow.shippingMethod ?? "standard",
          updatedBuyNow.codFee ?? 0,
          updatedBuyNow.paymentMethod ?? null
        );
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to update shipping method";
        toast.error(msg);
      }
    };

    const setPaymentMethod = async (method: "stripe" | "cod") => {
      try {
        await setPaymentMethodMutation.mutateAsync(method);
        buyNowStore.setPaymentMethod(method);
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Failed to update payment method";
        toast.error(msg);
      }
    };

    return {
      buyNow,
      clearBuyNow,
      applyCoupon,
      removeCoupon,
      setShippingMethod,
      setPaymentMethod,
      buyNowLoader,
      isApplyingCoupon: applyCouponMutation.isPending,
      isRemovingCoupon: removeCouponMutation.isPending,
      isSettingShipping: setShippingMethodMutation.isPending,
      isSettingPayment: setPaymentMethodMutation.isPending,
    };
  };

  return {
    ...buyNowStore,
    useBuyNowActions,
    isBuyNowLoading: isLoadingBuyNow,
  };
};

