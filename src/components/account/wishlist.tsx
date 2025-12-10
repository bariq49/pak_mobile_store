"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import { useIsMounted } from "@/utils/use-is-mounted";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlistList, removeFromWishlist } = useWishlist();
  const mounted = useIsMounted();

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  return (
    <>
      <h2 className="text-base md:text-lg font-semibold text-brand-dark lg:pt-0">
        List of saved products
      </h2>
      <div className="pt-8">
        {mounted ? (
          wishlistList.length === 0 ? (
            <p className="text-gray-500">No products in your wishlist.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-1.5 md:gap-5">
              {wishlistList.map((item: any) => (
                <ProductCard
                  key={`wishlist-${item.product.id}`}
                  product={item.product}
                  removeWishlist={() =>
                    handleRemoveFromWishlist(item.product.id)
                  }
                />
              ))}
            </div>
          )
        ) : (
          <div className="animate-pulse">Loading wishlist...</div>
        )}
      </div>
    </>
  );
}
