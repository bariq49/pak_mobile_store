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
import { useDepartmentProductsQuery } from "@/services/product/get-department-products";

export default function DepartmentPageContent() {
  const [isGridView, setIsGridView] = useState(true);
  const pathname = usePathname();
  const { getParams } = useQueryParam(pathname ?? "/");
  const queryParams = getParams;

  // Parse parent and child from path (URL segments)
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const parentSlug = pathSegments[1] || ""; // department (ex: accessories)
  const childSlug = pathSegments[2] || ""; // subcategory if exists

  const { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useDepartmentProductsQuery(
      parentSlug,
      childSlug,
      LIMITS.PRODUCTS_LIMITS,
      queryParams
    );

  return (
    <Element name="category" className="flex products-category">
      {/* Sidebar Filters */}
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7 w-[300px] top-16">
        <Filters departmentSlug={parentSlug} />
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
