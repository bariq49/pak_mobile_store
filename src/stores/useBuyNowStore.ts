import { create } from "zustand";
import {
  Item,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
} from "@/services/utils/cartUtils";

export interface BuyNowCoupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiry: string;
}

export interface BuyNowState {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  discount: number;
  finalTotal: number;
  coupon: BuyNowCoupon | null;
  shippingFee: number;
  shippingMethod: string | null;
  codFee: number;
  paymentMethod: "stripe" | "cod" | null;
}

interface BuyNowActions {
  setBuyNow: (
    items: Item[],
    discount?: number,
    coupon?: BuyNowCoupon | null,
    finalTotal?: number,
    shippingFee?: number,
    shippingMethod?: string | null,
    codFee?: number,
    paymentMethod?: "stripe" | "cod" | null
  ) => void;
  resetBuyNow: () => void;
  setPaymentMethod: (method: "stripe" | "cod" | null) => void;
}

export type BuyNowStore = BuyNowState & BuyNowActions;

const initialState: BuyNowState = {
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
  paymentMethod: null,
};

const generateBuyNowState = (
  items: Item[],
  discount = 0,
  coupon: BuyNowCoupon | null = null,
  finalTotal?: number,
  shippingFee = 0,
  shippingMethod: string | null = null,
  codFee = 0,
  paymentMethod: "stripe" | "cod" | null = null
) => {
  const totalUniqueItems = calculateUniqueItems(items);
  const total = calculateTotal(items);
  const final = finalTotal ?? total - discount + shippingFee + codFee;
  const calculatedItems = calculateItemTotals(items);

  return {
    items: calculatedItems,
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
    paymentMethod,
  };
};

export const useBuyNowStore = create<BuyNowStore>((set) => ({
  ...initialState,

  setBuyNow: (
    items,
    discount = 0,
    coupon: BuyNowCoupon | null = null,
    finalTotal,
    shippingFee = 0,
    shippingMethod: string | null = null,
    codFee = 0,
    paymentMethod: "stripe" | "cod" | null = null
  ) => {
    set({
      ...generateBuyNowState(
        items,
        discount,
        coupon,
        finalTotal,
        shippingFee,
        shippingMethod,
        codFee,
        paymentMethod
      ),
    });
  },

  resetBuyNow: () => {
    set({ ...initialState });
  },

  setPaymentMethod: (method: "stripe" | "cod" | null) => {
    set({ paymentMethod: method });
  },
}));

