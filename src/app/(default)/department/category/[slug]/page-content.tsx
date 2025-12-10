"use client";

import { Element } from "react-scroll";
import React, { useState } from "react";
import TopBar from "@/components/category/top-bar";
import { ProductLoadMore } from "@/components/product/productListing/product-loadmore";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import { LIMITS } from "@/services/utils/limits";
import { usePathname } from "next/navigation";
import useQueryParam from "@/utils/use-query-params";
import { usePaginatedProductsQuery } from "@/services/product/get-paginated-products.ts";

export default function PageContent() {
  const [isGridView, setIsGridView] = useState(true);
  const pathname = usePathname();
  const { getParams } = useQueryParam(pathname ?? "/");

  const queryParams: { sort_by?: string } = getParams(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}`
  );

  const limit = LIMITS.PRODUCTS_LIMITS;

  const { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    usePaginatedProductsQuery({
      limit,
      sort_by: queryParams.sort_by,
    });

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  console.log("Flattened products:", products);

  return (
    <Element name="category" className="flex products-category">
      {/* Sidebar Filters */}
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7 w-[300px] top-16">
        <Filters />
      </div>

      {/* Main Content */}
      <div className="w-full">
        <DrawerFilter />
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
