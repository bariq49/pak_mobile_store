import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { convertTaxToNumber } from "@/services/utils/cartUtils";

// ---------------------- Attachment ----------------------
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
  original2?: string;
};

// ---------------------- Order Item ----------------------
export interface OrderItem {
  product: string; // product _id
  name: string;
  price: number;
  quantity: number;
  image?: Attachment | null;
  /** Backend-computed original (effective) unit price before any deal, used for strike-through and subtotals. */
  originalPrice?: number | null;
  /** Backend-computed deal unit price when a deal is applied; null or >= originalPrice when no active deal. */
  dealPrice?: number | null;
  /**
   * Optional tax percentage for the item (e.g. 4 = 4%)
   * This mirrors the cart item tax so we can show tax in order summaries.
   */
  tax?: number | null;
}

// ---------------------- Shipping Address ----------------------
export interface OrderAddress {
  _id: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  state?: string;
  city: string;
  area?: string;
  streetAddress: string;
  apartment?: string;
  postalCode: string;
  label?: string;
  isDefault?: boolean;
}

// ---------------------- Order ----------------------
export interface OrderCoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

export interface Order {
  shippingMethod: any;
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  paymentMethod: "stripe" | "applepay" | "COD" | "cod";
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "unpaid";
  paymentIntentId?: string | null;
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  discount: number;
  codFee?: number;
  coupon?: OrderCoupon | null;
  totalAmount: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// ---------------------- Create Order Payload ----------------------
export interface CreateOrderPayload {
  addressId: string;
  paymentMethod: "stripe" | "applepay" | "COD" | "cod";
  metadata?: Record<string, any>;
  isBuyNow?: boolean;
}

// ---------------------- API Functions ----------------------
/**
 * Normalise a single order item so the UI can treat it like a cart item.
 * - Ensures tax is a proper number (or null)
 * - Leaves image as‑is (image resolution is handled in the UI hook)
 */
const normalizeOrderItem = (item: any): OrderItem => {
  // Try multiple possible tax field names from backend
  const rawTax =
    item?.tax ??
    item?.taxRate ??
    item?.tax_rate ??
    item?.taxPercentage ??
    item?.tax_percentage;

  return {
    ...item,
    tax: convertTaxToNumber(rawTax),
  };
};

/**
 * Normalise order shape from backend into the structure expected by the UI.
 * - Handles both { order: {...} } and plain order objects
 * - Maps snake_case fields (shipping_fee, total_amount, cod_fee, etc.) to camelCase
 * - Normalises each order item (tax, etc.)
 */
const normalizeOrderResponse = (raw: any) => {
  if (!raw) return raw;

  const source: any = raw.order ?? raw;

  const order: any = {
    ...source,
    // Core monetary fields
    subtotal:
      source.subtotal ??
      source.sub_total ??
      source.sub_total_amount ??
      0,
    shippingFee:
      source.shippingFee ??
      source.shipping_fee ??
      0,
    codFee: source.codFee ?? source.cod_fee ?? 0,
    discount: source.discount ?? source.discount_amount ?? 0,
    totalAmount:
      source.totalAmount ??
      source.total_amount ??
      source.total ??
      0,
    // Shipping method / meta
    shippingMethod:
      source.shippingMethod ??
      source.shipping_method ??
      source.shipping_method_name ??
      source.shipping ??
      null,
  };

  if (Array.isArray(source.items)) {
    order.items = source.items.map(normalizeOrderItem);
  }

  return raw.order ? { ...raw, order } : order;
};

const fetchOrders = async () => {
  const { data } = await http.get(API_RESOURCES.ORDERS);
  const payload = data.data;

  // Normalize each order's items (tax, etc.)
  if (Array.isArray(payload?.orders)) {
    payload.orders = payload.orders.map(normalizeOrderResponse);
  }

  return payload;
};

const fetchOrder = async (orderId: string) => {
  const { data } = await http.get(`${API_RESOURCES.ORDERS}/${orderId}`);
  const payload = data.data;
  return normalizeOrderResponse(payload);
};

const createOrder = async (payload: CreateOrderPayload) => {
  const response = await http.post(API_RESOURCES.ORDERS, payload);
  return response.data.data as { order: Order; clientSecret?: string };
};

// ---------------------- React Query Hooks ----------------------
const useOrdersQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDERS],
    queryFn: fetchOrders,
  });
};
const useOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDERS, orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId,
  });
};

const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_RESOURCES.ORDERS, API_RESOURCES.CART],
      });
      // If it's a buy-now order, also invalidate buy-now queries
      if (variables.isBuyNow) {
        queryClient.invalidateQueries({
          queryKey: [API_RESOURCES.BUY_NOW],
        });
      }
    },
  });
};

export {
  fetchOrders,
  fetchOrder,
  createOrder,
  useOrdersQuery,
  useOrderQuery,
  useCreateOrderMutation,
};
