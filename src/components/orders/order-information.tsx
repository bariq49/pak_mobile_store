"use client";

import OrderDetails from "@/components/orders/order-details";
import cn from "classnames";
import React from "react";
import Loading from "@/components/shared/loading";
import Link from "@/components/shared/link";
import { useOrderQuery } from "@/services/order/order-api";
import { useParams } from "next/navigation";

export default function OrderInformation() {
  const params = useParams();
  const orderId = params?.orderId as string; 
  const { data, isLoading } = useOrderQuery(orderId);

  if (isLoading) return <Loading />;

  return (
    <div className="py-10 lg:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
        {/* Left Section */}
        <div className="bg-white w-full px-5 md:px-8 py-8 rounded-lg space-y-6 border border-border-base">
          <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark lg:pt-0">
            Thank you {data?.shippingAddress?.fullName || "Customer"}!
          </h2>
          <p>
            Your order number is{" "}
            <span className="font-medium">{data?._id}</span>
          </p>

          <p className="leading-8">
            An email will be sent containing information about your purchase. If
            you have any questions, email us at{" "}
            <Link
              href="mailto:sales@embridge.com"
              className={cn("text-primary-500 hover:underline")}
            >
              sales@embridge.com
            </Link>{" "}
            or call us at{" "}
            <Link
              href="tel:(1800)-000-6890"
              className={cn("text-primary-500 hover:underline")}
            >
              (1800)-000-6890
            </Link>
            .
          </p>

          <div className="pt-10 border-t border-border-base">
            <Link href="/" variant="button-black" className="sm:inline-block">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white rounded-lg border border-border-base">
          <OrderDetails order={data || []} />
        </div>
      </div>
    </div>
  );
}
