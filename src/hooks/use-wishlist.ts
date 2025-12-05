// 📁 hooks/useWishlist.ts
import { useWishlistStore } from '@/stores/useWishlistStore'

export const useWishlist = () => {
    return {
        wishlistList: useWishlistStore((state) => state.wishlistList),
        addToWishlist: useWishlistStore((state) => state.addToWishlist),
        removeFromWishlist: useWishlistStore((state) => state.removeFromWishlist),
        clearWishlist: useWishlistStore((state) => state.clearWishlist),
    };
};
