"use client";

import React, { useEffect, useMemo, useState } from "react";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import { useCategories } from "@/services/category/get-all-categories";
import useCarouselConfig from "@/hooks/use-carousel-config";
import Loading from "@/components/shared/loading";
import { useProductsByParentCategory } from "@/services/product/get-products-by-parent-category";

const CategoryBlock = ({ parentCat }: { parentCat: any }) => {
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (parentCat?.children?.length && !activeTab) {
      setActiveTab(parentCat.children[0].slug);
    }
  }, [parentCat, activeTab]);

  const { data, isLoading: loadingProducts } = useProductsByParentCategory({
    limit: 10,
    parent: parentCat.slug,
    child: activeTab || "",
  });

  const products = data?.products ?? [];
  const { spaceBetween, breakpoints } = useCarouselConfig("default");

  return (
    <div key={parentCat.id} className="mb-8 lg:mb-12">
      {/* Tabs */}
      <ListingTabs
        data={parentCat}
        onNavClick={setActiveTab}
        activeTab={activeTab}
      />

      <div className="relative after-item-opacity mt-5">
        {loadingProducts ? (
          <Loading />
        ) : products.length > 0 ? (
          <Carousel
            spaceBetween={spaceBetween}
            breakpoints={breakpoints}
            prevActivateId={`prev-${parentCat.slug}`}
            nextActivateId={`next-${parentCat.slug}`}
            prevButtonClassName="start-3 xl:start-5"
            nextButtonClassName="end-3 xl:end-5"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center rounded py-5">
            <p className="text-brand-dark">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ListingCategory: React.FC = () => {
  const { data: categories, isLoading: loadingCategories } = useCategories();

  if (loadingCategories) return <Loading />;

  return (
    <>
      {categories?.map((parentCat) => (
        <CategoryBlock key={parentCat.id} parentCat={parentCat} />
      ))}
    </>
  );
};

export default ListingCategory;
