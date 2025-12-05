import { useState } from "react";
import { useShallow } from 'zustand/shallow';
import { useCartStore } from '@/stores/useCartStore';
import type { CartState } from '@/stores/useCartStore';
import { Product, VariationOption } from "@/services/types";
import { constructCartItem } from "@/utils/construct-cart-item";
import { Item } from "@/services/utils/cartUtils";

export const useCart = () => {
    const cartStore = useCartStore(
        useShallow((state: CartState) => ({
            items: state.items,
            isEmpty: state.isEmpty,
            totalItems: state.totalItems,
            totalUniqueItems: state.totalUniqueItems,
            total: state.total,
            addItemWithQuantity: state.addItemWithQuantity,
            removeItemOrQuantity: state.removeItemOrQuantity,
            addItem: state.addItem,
            updateItem: state.updateItem,
            removeItem: state.removeItem,
            resetCart: state.resetCart,
        }))
    );

    const useCartActions = (data?: Item | Product, selectedVariation?: VariationOption, selectedQuantity: number = 1) => {
        const { addItemWithQuantity } = cartStore;
        const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

        const addToCart = async () => {
            if (!data) return;
            setAddToCartLoader(true);
            try {
                const item = constructCartItem(data, selectedVariation!);
                await addItemWithQuantity(item, selectedQuantity);
            } catch (error) {
                console.error("Failed to add item to cart:", error);
            } finally {
                setTimeout(() => {
                    setAddToCartLoader(false);
                }, 1000);
            }
        };

        return {
            addToCart,
            addToCartLoader,
        };
    };

    const useCartHelpers = () => {
        const store = useCartStore();

        const isInCart = (productId: string | number) => {
            return store.items.some((item) => item.id === productId);
        };

        const getItemFromCart = (productId: string | number) => {
            return store.items.find((item) => item.id === productId);
        };

        const isInStock = (productId: string | number) => {
            const cartItem = getItemFromCart(productId);
            if (cartItem && cartItem.stock !== undefined) {
                return cartItem.quantity! < cartItem.stock;
            }
            return true; // if no stock information, assume in stock
        };

        const outOfStock = (productId: string | number) => isInCart(productId) && !isInStock(productId);

        return {
            isInCart,
            getItemFromCart,
            isInStock,
            outOfStock,
        };
    };

    return {
        ...cartStore,
        useCartHelpers,
        useCartActions,
    };
};