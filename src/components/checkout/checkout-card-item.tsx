'use client';
import {Item} from "@/services/utils/cartUtils";
import Image from '@/components/shared/image';
import usePrice from '@/services/product/use-price';
import React from "react";
import { productPlaceholder } from "@/assets/placeholders";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
  });

  return (
    <div className="flex items-center">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          src={item.image || productPlaceholder}
          alt={"item image"}
          className="rounded-md"
          width={64}
          height={64}
        />
      </div>
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        <span className="font-medium">{item.quantity} x </span> {item.name}
      </h6>
      <div className="w-24 text-end font-semibold ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {price}
      </div>
    </div>
  );
};
