"use client";

import React, { useState } from "react";
import { useIsMounted } from "@/utils/use-is-mounted";
import { useCart } from "@/hooks/use-cart";
import Loading from "@/components/shared/loading";
import { CheckoutItem } from "@/components/checkout/checkout-card-item";
import { Loader, Trash2 } from "lucide-react";
import usePrice from "@/services/product/use-price";
import Input from "@/components/shared/form/input";

const CheckoutCard: React.FC = () => {
  const {
    items,
    total = 0,
    discount = 0,
    finalTotal = 0,
    coupon,
    isEmpty,
    shippingFee = 0,
    shippingMethod = "standard",
    useCartActions,
    codFee = 0,
  } = useCart();

  const mounted = useIsMounted();
  const [couponCode, setCouponCode] = useState("");

  const { applyCoupon, removeCoupon, isApplyingCoupon, isRemovingCoupon } =
    useCartActions();

  const { price: formattedSubtotal } = usePrice({ amount: total });
  const { price: formattedDiscount } = usePrice({ amount: discount });
  const { price: formattedShipping } = usePrice({ amount: shippingFee });
  const { price: formattedCOD } = usePrice({ amount: codFee });
  const { price: formattedTotal } = usePrice({ amount: finalTotal });

  const handleApply = () => {
    if (couponCode.trim() && !coupon) {
      applyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  const handleRemove = () => {
    removeCoupon();
  };

  if (!mounted)
    return (
      <div className="bg-white p-5 md:p-8 border rounded-md border-border-base">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base">
          <h2 className="text-lg font-medium text-brand-dark">Order Summary</h2>
        </div>
        <Loading />
      </div>
    );

  return (
    <div className="bg-white p-5 md:p-8 border rounded-lg">
      <h2 className="text-lg font-semibold text-brand-dark mb-5">
        Order Summary
      </h2>
      <div
        className={`space-y-4 pb-5 ${
          items.length > 2 ? "max-h-60 overflow-y-auto pr-2" : ""
        }`}
      >
        {isEmpty ? (
          <p className="py-4 text-center text-brand-muted">
            Your cart is empty.
          </p>
        ) : (
          items.map((item, index) => (
            <CheckoutItem item={item} key={item.id ?? index} />
          ))
        )}
      </div>

      {!isEmpty && (
        <>
          <div className="space-y-3 mb-5 pt-5 border-t border-border-base">
            <h3 className="text-brand-dark mb-2 font-medium">Coupon</h3>
            {coupon ? (
              <div className="flex justify-between items-center p-4 rounded-lg border border-border-base">
                <div>
                  <span className="text-green-700 font-medium">
                    Applied: {coupon.code}
                  </span>
                  <p className="text-green-700 text-sm">
                    Discount:{" "}
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue?.toFixed(2) ?? 0}`}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center justify-center"
                  onClick={handleRemove}
                  disabled={isRemovingCoupon}
                >
                  {isRemovingCoupon ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Input
                  name="coupon"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <button
                  onClick={handleApply}
                  disabled={isApplyingCoupon}
                  className="px-4 py-2 bg-black text-white rounded-md flex items-center justify-center gap-2"
                >
                  {isApplyingCoupon ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-brand-dark">
              <span>Subtotal</span>
              <span>{formattedSubtotal}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>- {formattedDiscount}</span>
              </div>
            )}

            <div className="flex justify-between text-brand-dark">
              <span>
                Shipping{" "}
                {shippingMethod && (
                  <span className="text-sm text-gray-500">
                    ({shippingMethod})
                  </span>
                )}
              </span>
              {shippingFee > 0 ? (
                <span>+ {formattedShipping}</span>
              ) : (
                <span className="text-green-600 font-medium">
                  Free Shipping
                </span>
              )}
            </div>

            {codFee > 0 && (
              <div className="flex justify-between text-brand-dark font-medium">
                <span>COD Fee</span>
                <span>+ {formattedCOD}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between font-bold text-lg pt-6 border-t ">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutCard;
