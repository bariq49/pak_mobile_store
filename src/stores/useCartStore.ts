import { create } from "zustand";
import { persist } from "zustand/middleware";
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
} from "@/services/utils/cartUtils";

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiry: string;
}

export interface State {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  discount: number;
  finalTotal: number;
  coupon: Coupon | null;
  shippingFee: number;
  shippingMethod: string | null;
  codFee: number;
  paymentMethod: "stripe" | "cod" | null; // <-- Added
}

interface Actions {
  addItemWithQuantity: (item: Item, quantity: number) => void;
  removeItemOrQuantity: (id: Item["id"], quantity?: number) => void;
  addItem: (item: Item) => void;
  updateItem: (id: Item["id"], item: UpdateItemInput) => void;
  removeItem: (id: Item["id"]) => void;
  resetCart: () => void;
  setCart: (
    items: Item[],
    discount?: number,
    coupon?: Coupon | null,
    finalTotal?: number,
    shippingFee?: number,
    shippingMethod?: string | null,
    codFee?: number
  ) => void;
  setPaymentMethod: (method: "stripe" | "cod" | null) => void; // <-- Added
}

export type CartState = State & Actions;

const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  discount: 0,
  finalTotal: 0,
  coupon: null,
  shippingFee: 0,
  shippingMethod: null,
  codFee: 0,
  paymentMethod: null, // <-- default
};

const generateFinalState = (
  items: Item[],
  discount = 0,
  coupon: Coupon | null = null,
  finalTotal?: number,
  shippingFee = 0,
  shippingMethod: string | null = null,
  codFee = 0
) => {
  const totalUniqueItems = calculateUniqueItems(items);
  const total = calculateTotal(items);
  const final = finalTotal ?? total - discount + shippingFee + codFee;

  return {
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    total,
    isEmpty: totalUniqueItems === 0,
    discount,
    finalTotal: final,
    coupon,
    shippingFee,
    shippingMethod,
    codFee,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Cart Actions
      addItemWithQuantity: (item, quantity) => {
        const items = addItemWithQuantity(get().items, item, quantity);
        set({
          ...generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod,
            get().codFee
          ),
        });
      },

      removeItemOrQuantity: (id, quantity = 1) => {
        const items = removeItemOrQuantity(get().items, id, quantity);
        set({
          ...generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod,
            get().codFee
          ),
        });
      },

      addItem: (item) => {
        const items = addItem(get().items, item);
        set({
          ...generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod,
            get().codFee
          ),
        });
      },

      updateItem: (id, itemData) => {
        const items = updateItem(get().items, id, itemData);
        set({
          ...generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod,
            get().codFee
          ),
        });
      },

      removeItem: (id) => {
        const items = removeItem(get().items, id);
        set({
          ...generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod,
            get().codFee
          ),
        });
      },

      resetCart: () => {
        set({ ...initialState });
        try {
          localStorage.removeItem("glozin-cart");
        } catch (error) {
          console.error("Failed to clear persisted cart:", error);
        }
      },

      setCart: (
        items,
        discount = 0,
        coupon: Coupon | null = null,
        finalTotal,
        shippingFee = 0,
        shippingMethod: string | null = null,
        codFee = 0
      ) => {
        set({
          ...generateFinalState(
            items,
            discount,
            coupon,
            finalTotal,
            shippingFee,
            shippingMethod,
            codFee
          ),
        });
      },

      // Persisted payment method
      setPaymentMethod: (method: "stripe" | "cod" | null) => {
        set({ paymentMethod: method });
      },
    }),
    {
      name: "glozin-cart",
      partialize: (state) => ({
        items: state.items,
        discount: state.discount,
        coupon: state.coupon,
        finalTotal: state.finalTotal,
        shippingFee: state.shippingFee,
        shippingMethod: state.shippingMethod,
        paymentMethod: state.paymentMethod, // <-- persist payment
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Error rehydrating cart state:", error);
        if (state && state.items) {
          const items = state.items;
          state.totalItems = calculateTotalItems(items);
          state.totalUniqueItems = calculateUniqueItems(items);
          state.total = calculateTotal(items);
          state.finalTotal =
            state.total - (state.discount ?? 0) + (state.shippingFee ?? 0);
          state.isEmpty = items.length === 0;
        }
      },
    }
  )
);
