// app/product/[slug]/page-content.tsx
"use client";
import React from "react";
import { Element } from "react-scroll";
import { useParams } from "next/navigation";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import { useProductQuery } from "@/services/product/get-product";
import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";
import Loading from "@/components/shared/loading";
import { Variation } from "@/services/types";
import useProductVariations from "@/hooks/use-product-variations";
import ProductDetailsTab from "@/components/product/productDetails/ProductDetailsTab";

export default function PageContent() {
  const pathname = useParams();
  const { slug } = pathname;
  const { data, isLoading } = useProductQuery(slug as string);
  const { initialAttributes } = useProductVariations(data);
  const [attributes, setAttributes] = React.useState<{ [key: string]: string }>(
    initialAttributes
  );

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div className="col-span-full flex justify-center items-center bg-white rounded py-5">
        <p className="text-brand-dark">Product not found or failed to load.</p>
      </div>
    );
  }

  return (
    <>
      <Element name="category" className="xl:flex flex-row-reverse">
        <div className="xl:sticky z-40 lg:block h-full shrink-0 top-20 w-full xl:w-[36%]">
          <ProductView
            data={data}
            className={"mb-8 lg:mb-20 "}
            attributes={attributes}
            setAttributes={setAttributes}
            useVariations={data.variations as Variation[]}
          />
        </div>
        <div className="w-full xl:w-[64%] xl:pe-10 xl:mb-0 mb-8">
          <ProductGallery
            data={data}
            className={"mb-8 lg:mb-20 "}
            attributes={attributes}
          />
          <ProductDetailsTab data={data} />
        </div>
      </Element>

      {/* Pass slug to Related Products */}
      <RelatedProductSlider slug={slug as string} />
    </>
  );
}
