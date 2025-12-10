import { QueryOptionsType } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch all wishlist items
const fetchWishlists = async () => {
  const { data } = await http.get(API_RESOURCES.WISHLIST);
  return data?.data?.wishlist;
};
// Hook for fetching wishlist
const useWishlistQuery = (options: QueryOptionsType) => {
  return useQuery({
    queryKey: [API_RESOURCES.WISHLIST, options],
    queryFn: fetchWishlists,
  });
};
// Add item to wishlist
const addToWishlist = async (productId: string) => {
  const { data } = await http.post(`${API_RESOURCES.ADD_WISHLIST}/${productId}`);
  return data;
};
// Hook for adding to wishlist
const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      // Invalidate and refetch wishlist after successful addition
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.WISHLIST] });
    },
  });
};
// Remove item from wishlist
const removeFromWishlist = async (productId: string) => {
  const { data } = await http.delete(
    `${API_RESOURCES.REMOVE_WISHLIST}/${productId}`
  );
  return data;
};
// Hook for removing from wishlist
const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      // Invalidate and refetch wishlist after successful removal
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.WISHLIST] });
    },
  });
};
 
// Merge local wishlist with server wishlist
const mergeWishlist = async (productIds: string[]) => {
  const { data } = await http.post(`${API_RESOURCES.WISHLIST}/merge`, {
    productIds,
  });
  return data.wishlist;
};
// Hook for merging wishlists
const useMergeWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mergeWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.WISHLIST] });
    },
  });
};


export {
  useWishlistQuery,
  useAddToWishlist,
  useRemoveFromWishlist,
  useMergeWishlist,
  fetchWishlists,
  addToWishlist,
  removeFromWishlist,
};
