import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    Item,
    UpdateItemInput,
    addItemWithQuantity,
    removeItemOrQuantity,
    addItem,
    updateItem,
    removeItem,
    calculateUniqueItems,
    calculateItemTotals,
    calculateTotalItems,
    calculateTotal,
} from '@/services/utils/cartUtils';

export interface State {
    items: Item[];
    isEmpty: boolean;
    totalItems: number;
    totalUniqueItems: number;
    total: number;
}

interface Actions {
    addItemWithQuantity: (item: Item, quantity: number) => void;
    removeItemOrQuantity: (id: Item['id'], quantity?: number) => void;
    addItem: (item: Item) => void;
    updateItem: (id: Item['id'], item: UpdateItemInput) => void;
    removeItem: (id: Item['id']) => void;
    resetCart: () => void;
}

export type CartState = State & Actions;

const initialState: State = {
    items: [],
    isEmpty: true,
    totalItems: 0,
    totalUniqueItems: 0,
    total: 0,
};

const generateFinalState = (items: Item[]) => {
    const totalUniqueItems = calculateUniqueItems(items);
    return {
        items: calculateItemTotals(items),
        totalItems: calculateTotalItems(items),
        totalUniqueItems,
        total: calculateTotal(items),
        isEmpty: totalUniqueItems === 0,
    };
};


export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            ...initialState,
            addItemWithQuantity: (item, quantity) => {
                const items = addItemWithQuantity(get().items, item, quantity);
                set(generateFinalState(items));
            },
            removeItemOrQuantity: (id, quantity = 1) => {
                const items = removeItemOrQuantity(get().items, id, quantity);
                set(generateFinalState(items));
            },
            addItem: (item) => {
                const items = addItem(get().items, item);
                set(generateFinalState(items));
            },
            updateItem: (id, itemData) => {
                const items = updateItem(get().items, id, itemData);
                set(generateFinalState(items));
            },
            removeItem: (id) => {
                const items = removeItem(get().items, id);
                set(generateFinalState(items));
            },
            resetCart: () => set(initialState),
        }),
        {
            name: 'glozin-cart',
            partialize: (state) => ({
                items: state.items,
            }),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error('Error rehydrating cart state:', error);
                    }
                    if (state && state.items) {
                        const items = state.items || [];
                        state.totalItems = calculateTotalItems(items);
                        state.total = calculateTotal(items);
                        state.isEmpty = items.length === 0;
                    }
                };
            },
        }
    )
);