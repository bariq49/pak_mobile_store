"use client";

import React, { useState } from "react";
import { Element } from "react-scroll";
import { usePathname } from "next/navigation";

import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import { ProductLoadMore } from "@/components/product/productListing/product-loadmore";
import { LIMITS } from "@/services/utils/limits";

import useQueryParam from "@/utils/use-query-params";
import { useCategoryProductsQuery } from "@/services/product/get-category-products";

export default function CategoryPageContent() {
  const [isGridView, setIsGridView] = useState(true);
  const pathname = usePathname();
  const { getParams } = useQueryParam(pathname ?? "/");
  const queryParams = getParams;

  // Parse category slug from path (URL segment)
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const categorySlug = pathSegments[1] || ""; // category slug

  const { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useCategoryProductsQuery(
      categorySlug,
      LIMITS.PRODUCTS_LIMITS,
      queryParams
    );

  return (
    <Element name="category" className="flex products-category">
      {/* Sidebar Filters */}
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7 w-[300px] top-16">
        <Filters departmentSlug={categorySlug} />
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

