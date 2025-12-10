import { useModal } from "@/hooks/use-modal";
import CloseButton from "@/components/shared/close-button";

import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";
import React, { useState } from "react";
import useProductVariations from "@/hooks/use-product-variations";

export default function ProductQuickview() {
  const { data, closeModal } = useModal();

  // Initialize attributes dynamically based on product variations
  const { initialAttributes } = useProductVariations(data);
  const [attributes, setAttributes] = React.useState<{ [key: string]: string }>(
    initialAttributes
  );

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-3  lg:p-7 bg-white rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="grid-cols-12 lg:grid gap-7 2xl:gap-10  ">
        <ProductGallery
          data={data}
          className={"col-span-6 "}
          attributes={attributes}
          variant={"bottom"}
        />

        <ProductView
          data={data}
          className={"col-span-6 "}
          variant={"quickview"}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </div>
    </div>
  );
}
