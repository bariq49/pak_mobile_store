'use client';

import {useWishlist} from "@/hooks/use-wishlist";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import {useIsMounted} from "@/utils/use-is-mounted";

export default function Wishlist() {
    const {wishlistList, removeFromWishlist} = useWishlist(); // this is just the array of products

    const mounted = useIsMounted();
  return (
      <>
          <h2 className="text-base md:text-lg  font-semibold text-brand-dark  lg:pt-0">
              List of saved products
          </h2>
          <div className=" pt-8 ">
              {mounted ? (
                  wishlistList.length === 0 ? (
                      <p>No products in the Wishlist list.</p>
                  ) : (
                      <div
                          className={
                              'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-1.5 md:gap-5'
                          }
                      >
                          {wishlistList.map((product) => (
                              <ProductCard
                                  key={`wishlistList-${product.id}`}
                                  product={product}
                                  removeWishlist={removeFromWishlist}
                              />
                          ))}
                      </div>
                  )
              ) : null}
             
              
          </div>
      </>
  );
}
