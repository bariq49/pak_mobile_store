"use client";

import React, { useState } from "react";
import { Element } from "react-scroll";
import TopBar from "@/components/category/top-bar";
import { ProductLoadMore } from "@/components/product/productListing/product-loadmore";
import Filters from "@/components/filter/filters";
import { LIMITS } from "@/services/utils/limits";
import { usePathname } from "next/navigation";
import useQueryParam from "@/utils/use-query-params";
import { useShopProductsQuery } from "@/services/product/get-shop-products";

export default function ShopPageContent() {
  const [isGridView, setIsGridView] = useState(true);
  const pathname = usePathname();

  const { getParams } = useQueryParam(pathname ?? "/");
  const queryParams = getParams;

  const { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useShopProductsQuery(LIMITS.PRODUCTS_LIMITS, queryParams);

  return (
    <Element name="category" className="flex products-category">
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7 w-[300px] top-16">
        <Filters />
      </div>
      <div className="w-full">
        <TopBar viewAs={isGridView} setViewAs={setIsGridView} />
        <ProductLoadMore
          data={data}
          isLoading={isFetching}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          loadingMore={isFetchingNextPage}
          viewAs={isGridView}
        />
      </div>
    </Element>
  );
}
