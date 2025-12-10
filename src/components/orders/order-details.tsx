"use client";

import usePrice from "@/services/product/use-price";
import { Order, OrderItem } from "@/services/order/order-api";
import { Printer, ShoppingBag } from "lucide-react";
import React from "react";
import Image from "next/image";
import { productPlaceholder } from "@/assets/placeholders";
import Link from "../shared/link";

const OrderItemCard = ({ item }: { item: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: item.price * item.quantity,
  });

  return (
    <div className="flex gap-3 items-center py-2">
      <div className="flex w-12 h-12 border rounded-md border-border-base shrink-0">
        <Image
          src={item?.image?.thumbnail || productPlaceholder}
          alt={item.name}
          width={48}
          height={48}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-brand-dark text-sm">
          <span className="font-medium">{item.quantity} x </span>
          {item.name}
        </p>
      </div>
      <div className="text-brand-dark text-end shrink-0">
        <p className="font-semibold text-sm">{itemTotal}</p>
      </div>
    </div>
  );
};

const OrderDetails: React.FC<{ order: Order; className?: string }> = ({
  order,
  className = "pt-0",
}) => {
  const { price: formattedSubtotal } = usePrice({ amount: order.subtotal });
  const { price: formattedDiscount } = usePrice({ amount: order.discount });
  const { price: formattedShipping } = usePrice({ amount: order.shippingFee });
  const { price: formattedCOD } = usePrice({ amount: order.codFee || 0 });
  const { price: formattedTotal } = usePrice({ amount: order.totalAmount });

  return (
    <div
      className={`bg-white p-5 md:p-8 border rounded-lg border-border-base ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-border-base">
        <h2 className="text-lg font-semibold text-brand-dark">Order Summary</h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <Printer className="w-4 h-4 mr-1" />
          <span>Print</span>
        </button>
      </div>

      {/* Items */}
      <div
        className={`mb-4 pb-2 border-b border-border-base ${
          order.items.length > 2 ? "max-h-60 overflow-y-auto pr-2" : ""
        }`}
      >
        {order.items.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No items in this order.
          </p>
        ) : (
          order.items.map((item, index) => (
            <OrderItemCard key={index} item={item} />
          ))
        )}
      </div>

      {/* Coupon */}
      {order.coupon?.code && (
        <div className="space-y-3 mb-5">
          <h3 className="text-brand-dark mb-2 font-medium">Coupon</h3>
          <div className="flex justify-between items-center p-4 rounded-lg border border-border-base">
            <div>
              <span className="text-green-700 font-medium">
                Applied: {order.coupon.code}
              </span>
              <p className="text-green-700 text-sm">
                Discount:{" "}
                {order.coupon.discountType === "percentage"
                  ? `${order.coupon.discountValue}%`
                  : `$${order.coupon.discountValue?.toFixed(2) ?? 0}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-brand-dark">
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>

        {order.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- {formattedDiscount}</span>
          </div>
        )}

        <div className="flex justify-between text-brand-dark">
          <span>
            Shipping{" "}
            {order.shippingMethod && (
              <span className="text-sm text-gray-500">
                ({order.shippingMethod})
              </span>
            )}
          </span>
          {order.shippingFee > 0 ? (
            <span>+ {formattedShipping}</span>
          ) : (
            <span className="text-green-600 font-medium">Free Shipping</span>
          )}
        </div>

        {order.codFee !== undefined && order.codFee > 0 && (
          <div className="flex justify-between text-brand-dark font-medium">
            <span>COD Fee</span>
            <span>+ {formattedCOD}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between font-bold text-lg pt-6 border-t border-border-base">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>
      {/* Action Buttons */}
      <div className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            variant="button-black"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm flex-1 text-center"
          >
            <ShoppingBag className="w-4 h-4" />
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
