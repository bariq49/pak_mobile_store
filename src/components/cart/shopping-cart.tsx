"use client";
import React from "react";
import { CartItemList } from "@/components/cart/cart-item-list";
import { OrderSummary } from "@/components/cart/order-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { useIsMounted } from "@/utils/use-is-mounted";
import Loading from "@/components/shared/loading";
import { useCart } from "@/hooks/use-cart";

const ShoppingCart: React.FC = () => {
  const {
    items: cartItems,
    total: subtotal,
    discount,
    finalTotal,
    shippingFee,
    shippingMethod,
    isEmpty,
    codFee,
    paymentMethod,
  } = useCart();

  const mounted = useIsMounted();
  if (!mounted) return <Loading />;
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 lg:py-30 bg-white rounded-md">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
      <div className="bg-white w-full px-5 md:p-8 rounded-lg space-y-6 border border-border-base">
        <CartItemList items={cartItems} />
      </div>
      <div>
        <OrderSummary
          subtotal={subtotal}
          paymentMethod={paymentMethod}
          codFee={codFee}
          discount={discount}
          shippingFee={shippingFee}
          shippingMethod={shippingMethod}
          total={finalTotal}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
