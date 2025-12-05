// 📁 stores/useWishlistStore.ts
import { create } from 'zustand'
import { Product } from '@/services/types'
import { persist } from 'zustand/middleware'

interface WishlistState {
    wishlistList: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlistList: [],
            
            addToWishlist: (product) => {
                const exists = get().wishlistList.some((p) => p.id === product.id);
                if (exists) return;
                set((state) => ({ wishlistList: [...state.wishlistList, product] }));
            },
            
            removeFromWishlist: (productId) => {
                set((state) => ({
                    wishlistList: state.wishlistList.filter((p) => p.id !== productId),
                }));
            },
            
            clearWishlist: () => set({ wishlistList: [] }),
        }),
        {
            name: 'wishlists', // localStorage key
        }
    )
);
