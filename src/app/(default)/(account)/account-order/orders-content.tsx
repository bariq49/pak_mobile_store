'use client';

import OrderTable from "@/components/orders/order-table";
import React from "react";
import Loading from "@/components/shared/loading";
import { useOrdersQuery } from "@/services/order/order-api";

export default function OrdersContent() {
  const { data, isLoading } = useOrdersQuery();

  if (isLoading) return <Loading />;

  return <OrderTable orders={data?.orders} />;
}
