"use client";

import React from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/shared/loading";
import OrderDetails from "@/components/orders/order-details";
import Link from "@/components/shared/link";
import { useOrderQuery } from "@/services/order/order-api";
import {
  CheckCircle,
  Mail,
  Phone,
  ShoppingBag,
  Package,
  LifeBuoy,
} from "lucide-react";

export default function OrderInformation() {
  const params = useParams();
  const orderId = params?.orderId as string;
  
  if (typeof window !== 'undefined') {
    console.log('Order ID:', orderId);
  }
  
  const { data, isLoading } = useOrderQuery(orderId);
  const order = data?.order;

  if (typeof window !== "undefined") {
    console.log("Order API raw response:", data);
    console.log("Normalized order object passed to UI:", order);
    if (order) {
      console.log("Order monetary fields:", {
        subtotal: order.subtotal,
        shippingFee: order.shippingFee,
        discount: order.discount,
        codFee: order.codFee,
        totalAmount: order.totalAmount,
        tax: (order as any).tax,
        taxTotal: (order as any).taxTotal,
      });
      console.log("Order first item for debugging:", order.items?.[0]);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className="py-10 lg:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
        {/* Left Section */}
        <div className="bg-white w-full px-5 md:px-8 py-8 rounded-lg space-y-6 border border-border-base">
          {/* Success Header */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark">
                Thank you {order?.shippingAddress?.fullName || "Customer"}!
              </h2>
              <p className="text-primary-700 font-medium mt-1">
                Your order has been confirmed
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            An email confirmation has been sent to your email address.
          </p>

          {/* Order Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Order Number */}
            <div className="group p-5 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-border hover:border-accent transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-4 bg-primary-500 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-brand-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">
                    Order Number
                  </p>
                  <p className="text-lg font-bold text-foreground truncate">
                    {order?.orderNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Number */}
            <div className="group p-5 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-border hover:border-accent transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-4 bg-primary-500 rounded-full">
                  <Package className="w-5 h-5 text-brand-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">
                    Tracking Number
                  </p>
                  <p className="text-lg font-bold text-foreground truncate">
                    {order?.trackingNumber || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help Box */}
          <div className="pt-6 border-t border-border-base">
            <div className="p-5 rounded-xl border border-border-base bg-gradient-to-br from-muted/20 to-muted/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-500 rounded-md">
                  <LifeBuoy className="w-5 h-5 text-brand-light" />
                </div>
                <h3 className="text-base font-semibold text-brand-dark">
                  Need Help?
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to assist you with any questions or
                issues related to your order.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <Link
                    href="mailto:sales@embridge.com"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    sales@embridge.com
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <Link
                    href="tel:(1800)-000-6890"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    (1800)-000-6890
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white">
          {order ? <OrderDetails order={order} /> : <p>No order found.</p>}
        </div>
      </div>
    </div>
  );
}
