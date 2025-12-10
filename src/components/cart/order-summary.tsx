"use client";

import React from "react";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import usePrice from "@/services/product/use-price";

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  shippingFee?: number;
  shippingMethod?: string | null;
  total: number;
  codFee?: number;
  paymentMethod?: string | null;
}

export function OrderSummary({
  subtotal,
  discount = 0,
  shippingFee = 0,
  shippingMethod = "standard",
  total,
  codFee = 0,
  paymentMethod = "stripe",
}: OrderSummaryProps) {
  const { price: formattedSubtotal } = usePrice({ amount: subtotal });
  const { price: formattedDiscount } = usePrice({ amount: discount });
  const { price: formattedShipping } = usePrice({ amount: shippingFee });
  const { price: formattedTotal } = usePrice({ amount: total });
  const { price: formattedCOD } = usePrice({ amount: codFee });
  console.log("paymentMethod", paymentMethod);
  return (
    <div className="p-5 md:p-8 bg-white rounded-lg border border-border-base">
      <h2 className="text-lg font-semibold text-brand-dark mb-5">
        Order Summary
      </h2>

      <div className="space-y-2 mb-4">
        {/* Subtotal */}
        <div className="flex justify-between text-brand-dark">
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- {formattedDiscount}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-brand-dark">
          <span>
            Shipping{" "}
            {shippingMethod && (
              <span className="text-sm text-gray-500">({shippingMethod})</span>
            )}
          </span>
          {shippingFee > 0 ? (
            <span>+ {formattedShipping}</span>
          ) : (
            <span className="text-green-600 font-medium">Free Shipping</span>
          )}
        </div>

        {/* COD Fee */}
        {codFee > 0 && (
          <div className="flex justify-between text-brand-dark font-medium">
            <span>COD Fee</span>
            <span>+ {formattedCOD}</span>
          </div>
        )}
        {paymentMethod === "cod" && codFee > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            You selected <span className="font-semibold">Cash on Delivery</span>
            . This is the additional COD fee.
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg pt-6 border-t border-border-base">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>

      {/* Checkout Button */}
      <div className="mt-4">
        <Link href={ROUTES.CHECKOUT} variant="button-black" className="w-full">
          <span>Proceed to Checkout</span>
        </Link>
      </div>
    </div>
  );
}
