"use client";

import React, { useState } from "react";
import { useIsMounted } from "@/utils/use-is-mounted";
import { useCart } from "@/hooks/use-cart";
import { useBuyNow } from "@/hooks/use-buy-now";
import Loading from "@/components/shared/loading";
import { CheckoutItem } from "@/components/checkout/checkout-card-item";
import { Loader, Trash2 } from "lucide-react";
import usePrice from "@/services/product/use-price";
import Input from "@/components/shared/form/input";
import {
  calculateSubtotalWithoutTax,
  calculateTaxTotal,
} from "@/services/utils/cartUtils";

interface CheckoutCardProps {
  isBuyNow?: boolean;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({ isBuyNow = false }) => {
  const cartData = useCart();
  const buyNowData = useBuyNow();

  // Use buy-now data if isBuyNow is true, otherwise use cart data
  const {
    items,
    total = 0,
    discount = 0,
    finalTotal = 0,
    coupon,
    isEmpty,
    shippingFee = 0,
    shippingMethod = "standard",
    codFee = 0,
  } = isBuyNow ? buyNowData : cartData;

  const useCartActions = isBuyNow
    ? buyNowData.useBuyNowActions
    : cartData.useCartActions;

  const mounted = useIsMounted();
  const [couponCode, setCouponCode] = useState("");

  const actions = useCartActions();
  const { applyCoupon, removeCoupon, isApplyingCoupon, isRemovingCoupon } =
    actions;

  // Derive subtotal (without tax) and total tax from cart items
  const subtotalWithoutTax = calculateSubtotalWithoutTax(items);
  const taxTotal = calculateTaxTotal(items);

  const { price: formattedSubtotal } = usePrice({ amount: subtotalWithoutTax });
  const { price: formattedDiscount } = usePrice({ amount: discount });
  const { price: formattedShipping } = usePrice({ amount: shippingFee });
  const { price: formattedCOD } = usePrice({ amount: codFee });
  const { price: formattedTotal } = usePrice({ amount: finalTotal });
  const { price: formattedTaxTotal } = usePrice({ amount: taxTotal });

  // Derive tax label like "Tax (4%)" when there is a single tax rate across items
  const distinctTaxRates = Array.from(
    new Set(
      items
        .map((item) =>
          typeof item.tax === "number" && item.tax > 0 ? item.tax : null
        )
        .filter((v): v is number => v !== null)
    )
  );
  const taxLabel =
    taxTotal > 0 && distinctTaxRates.length === 1
      ? `Tax (${distinctTaxRates[0]}%)`
      : "Tax";


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
      <div className="bg-white">
        <div className="pb-4 mb-5">
          <h2 className="text-xl font-normal text-brand-dark">Your cart</h2>
        </div>
        <Loading />
      </div>
    );

  return (
    <div className="bg-white">
      <h2 className="text-xl font-normal text-brand-dark mb-6">
        Your order summary
      </h2>
      <div
        className={`space-y-4 pb-6 ${
          items.length > 2 ? "max-h-96 overflow-y-auto pr-2" : ""
        }`}
      >
        {isEmpty ? (
          <p className="py-8 text-center text-brand-muted text-base">
            Your order summary is empty.
          </p>
        ) : (
          items.map((item, index) => (
            <CheckoutItem
              item={item}
              key={`${item.id}-${item.variationId || ""}-${index}`}
            />
          ))
        )}
      </div>

      {!isEmpty && (
        <>
          <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
            <h3 className="text-brand-dark mb-3 font-normal text-base">Coupon</h3>
            {coupon ? (
              <div className="flex justify-between items-center p-3 rounded border border-gray-200 bg-gray-50">
                <div>
                  <span className="text-green-700 font-normal text-sm">
                    Applied: {coupon.code}
                  </span>
                  <p className="text-green-700 text-xs mt-1">
                    Discount:{" "}
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue?.toFixed(2) ?? 0}`}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center justify-center p-1"
                  onClick={handleRemove}
                  disabled={isRemovingCoupon}
                >
                  {isRemovingCoupon ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
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
                  className="px-4 py-2 bg-black text-white rounded flex items-center justify-center gap-2 text-sm font-normal"
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

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-normal text-brand-dark mb-4">Estimated total</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-brand-dark text-base">
                <span>Subtotal</span>
                <span>{formattedSubtotal}</span>
              </div>

              {/* Show tax line - will be hidden if taxTotal is 0 */}
              {taxTotal > 0 && (
                <div className="flex justify-between text-brand-dark text-base">
                  <span>{taxLabel}</span>
                  <span>{formattedTaxTotal}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-base">
                  <span>Discount</span>
                  <span>- {formattedDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-brand-dark text-base">
                <span>
                  Shipping
                  {shippingMethod && (
                    <span className="text-sm text-gray-500 ml-1">
                      ({shippingMethod})
                    </span>
                  )}
                </span>
                {shippingFee > 0 ? (
                  <span>+ {formattedShipping}</span>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>

              {codFee > 0 && (
                <div className="flex justify-between text-brand-dark text-base">
                  <span>COD Fee</span>
                  <span>+ {formattedCOD}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Taxes, discounts and shipping calculated at checkout.
            </p>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>{formattedTotal}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutCard;
