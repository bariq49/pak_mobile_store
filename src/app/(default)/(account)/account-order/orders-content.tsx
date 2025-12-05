'use client';

import OrderTable from '@/components/orders/order-table';
import { useOrdersQuery } from '@/services/order/get-all-orders';
import React from "react";
import Loading from "@/components/shared/loading";

export default function OrdersContent() {
  const { data, isLoading } = useOrdersQuery({});
    
    if (isLoading) return <Loading/>;
  
  return <OrderTable orders={data?.data} />;
}
