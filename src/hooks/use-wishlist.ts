import { Product } from "@/services/types";
import {
  useWishlistQuery,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/services/wishlist/wishlist-api";
import toast from "react-hot-toast";

export const useWishlist = () => {
  const { data: wishlistList = [], isLoading } = useWishlistQuery({});
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const addToWishlist = (product: Product) => {
    addToWishlistMutation.mutate(String(product.id), {
      onSuccess: () => {
        toast.success(`${product.name} added to wishlist`);
      },
      onError: () => {
        toast.error("Failed to add product to wishlist");
      },
    });
  };

  const removeFromWishlist = (productId: string | number) => {
    removeFromWishlistMutation.mutate(String(productId), {
      onSuccess: () => {
        toast.success("Product removed from wishlist");
      },
      onError: () => {
        toast.error("Failed to remove product from wishlist");
      },
    });
  };

  return {
    wishlistList,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    addToWishlistMutation,
    removeFromWishlistMutation,
  };
};
