import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/stores/useCartStore";
import type { CartState } from "@/stores/useCartStore";
import { Product, VariationOption } from "@/services/types";
import { constructCartItem } from "@/utils/construct-cart-item";
import { Item } from "@/services/utils/cartUtils";
import {
  useCartQuery,
  useAddToCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
  useApplyCoupon,
  useRemoveCoupon,
} from "@/services/cart/cart-api";
import toast from "react-hot-toast";

export const useCart = () => {
  const cartStore = useCartStore(
    useShallow((state: CartState) => ({
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
      addItemWithQuantity: state.addItemWithQuantity,
      updateItem: state.updateItem,
      removeItem: state.removeItem,
      resetCart: state.resetCart,
      setCart: state.setCart,
      codFee: state.codFee,
      paymentMethod: state.paymentMethod,
      setPaymentMethod: state.setPaymentMethod,
    }))
  );

  /** React Query Mutations */
  const { data: cartData } = useCartQuery();
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveFromCart();
  const clearMutation = useClearCart();
  const applyCouponMutation = useApplyCoupon();
  const removeCouponMutation = useRemoveCoupon();

  /** Sync backend cart to Zustand */
  useEffect(() => {
    if (!cartData) return;

    cartStore.setCart(
      cartData.items ?? [],
      cartData.discount ?? 0,
      cartData.coupon ?? null,
      cartData.finalTotal ?? undefined,
      cartData.shippingFee ?? 0,
      cartData.shippingMethod ?? "standard",
      cartData.codFee ?? 0
    );
  }, [cartData]);

  /** 🛒 Cart Actions */
  const useCartActions = (
    data?: Item | Product,
    selectedVariation?: VariationOption,
    selectedQuantity: number = 1
  ) => {
    const [addToCartLoader, setAddToCartLoader] = useState(false);

    const addToCart = async () => {
      if (!data) return;
      setAddToCartLoader(true);
      const item = constructCartItem(data, selectedVariation!);

      try {
        await addMutation.mutateAsync({
          productId: item.id,
          quantity: selectedQuantity,
        });
        cartStore.addItemWithQuantity(item, selectedQuantity);
        toast.success(`${item.name} added to cart`);
      } catch {
        toast.error("Failed to add item to cart");
      } finally {
        setTimeout(() => setAddToCartLoader(false), 500);
      }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
      try {
        await updateMutation.mutateAsync({ productId, quantity });
        cartStore.updateItem(productId, { quantity });
        toast.success("Cart updated");
      } catch {
        toast.error("Failed to update item");
      }
    };

    const removeItem = async (productId: string) => {
      try {
        await removeMutation.mutateAsync(productId);
        cartStore.removeItem(productId);
        toast.success("Item removed from cart");
      } catch {
        toast.error("Failed to remove item");
      }
    };

    const clearCart = async () => {
      try {
        await clearMutation.mutateAsync();
        cartStore.resetCart();
        toast.success("Cart cleared");
      } catch {
        toast.error("Failed to clear cart");
      }
    };

    /** Coupon actions */
    const applyCoupon = async (code: string) => {
      try {
        const updatedCart = await applyCouponMutation.mutateAsync(code);
        cartStore.setCart(
          updatedCart.items,
          updatedCart.discount,
          updatedCart.coupon,
          updatedCart.finalTotal,
          updatedCart.shippingFee ?? 0,
          updatedCart.shippingMethod ?? "standard"
        );
        toast.success(`Coupon "${code}" applied successfully!`);
      } catch (error: any) {
        const msg = error?.response?.data?.message || "Failed to apply coupon";
        toast.error(msg);
      }
    };

    const removeCoupon = async () => {
      try {
        const updatedCart = await removeCouponMutation.mutateAsync();
        cartStore.setCart(
          updatedCart.items,
          updatedCart.discount,
          updatedCart.coupon,
          updatedCart.finalTotal,
          updatedCart.shippingFee ?? 0,
          updatedCart.shippingMethod ?? "standard"
        );
        toast.success("Coupon removed successfully!");
      } catch (error: any) {
        const msg = error?.response?.data?.message || "Failed to remove coupon";
        toast.error(msg);
      }
    };

    return {
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      addToCartLoader,
      isUpdating: updateMutation.isPending,
      isRemoving: removeMutation.isPending,
      isApplyingCoupon: applyCouponMutation.isPending,
      isRemovingCoupon: removeCouponMutation.isPending,
    };
  };

  /** 🛠️ Cart Helpers */
  const useCartHelpers = () => {
    const store = useCartStore();

    const isInCart = (productId: string | number) =>
      store.items.some((item) => item.id === productId);

    const getItemFromCart = (productId: string | number) =>
      store.items.find((item) => item.id === productId);

    const isInStock = (productId: string | number) => {
      const cartItem = getItemFromCart(productId);
      return !cartItem || cartItem.quantity! < (cartItem.stock ?? Infinity);
    };

    const outOfStock = (productId: string | number) =>
      isInCart(productId) && !isInStock(productId);

    return { isInCart, getItemFromCart, isInStock, outOfStock };
  };

  return {
    ...cartStore,
    useCartActions,
    useCartHelpers,
    isCartLoading: !cartData,
  };
};
