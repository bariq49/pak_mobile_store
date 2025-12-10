// components/product/productListing/product-loadmore.tsx
import React, { FC } from "react";
import Button from "@/components/shared/button";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import ProductCardList from "@/components/product/productListing/productCards/product-list";
import { PaginatedProduct, Product } from "@/services/types";
import { InfiniteData } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import { Loader, Loader2 } from "lucide-react"; // Import Lucide React loader

interface ProductProps {
  data?: InfiniteData<PaginatedProduct, unknown>;
  isLoading?: boolean;
  className?: string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  loadingMore?: boolean;
  viewAs: boolean;
}

export const ProductLoadMore: FC<ProductProps> = ({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  loadingMore,
  className = "",
  viewAs,
}) => {
  // Flatten all products from all pages
  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  // Check if there are any products
  const hasProducts = allProducts.length > 0;

  return (
    <>
      <div
        className={`${
          viewAs
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5"
            : "grid grid-cols-1 gap-1.5"
        } ${className}`}
      >
        {isLoading && allProducts.length === 0 ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : hasProducts ? (
          allProducts.map((product: Product) =>
            viewAs ? (
              <ProductCard
                key={`product--key-${product.id || product._id}`}
                product={product}
              />
            ) : (
              <ProductCardList
                key={`product--key-${product.id || product._id}`}
                product={product}
              />
            )
          )
        ) : (
          <div className="col-span-full flex justify-center items-center bg-white rounded py-5">
            <p className="text-brand-dark">No products available</p>
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="mt-1.5 py-5 text-center bg-white rounded">
          <Button
            disabled={loadingMore}
            onClick={() => fetchNextPage?.()}
            className={
              "w-60 xs:capitalize flex items-center justify-center gap-2"
            }
            variant={"primary"}
          >
            {loadingMore ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Looding...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {!hasNextPage && hasProducts && (
        <div className="mt-1.5 py-5 text-center bg-white rounded">
          <p className="text-brand-dark">No more products to load</p>
        </div>
      )}
    </>
  );
};
