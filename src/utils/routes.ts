// ----------------- Static Routes -----------------
const STATIC_ROUTES = {
  HOME: "/",
  ADDRESS_BOOK: "/address-book",
  CHECKOUT: "/checkout",
  CART: "/cart",
  CONTACT: "/contact-us",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  FAQ: "/faq",
  FORGET_PASSWORD: "/forget-password",
  CHANGE_PASSWORD: "/change-password",
  ACCOUNT: "/account",
  ACCOUNT_BILLING: "/account-billing",
  SAVELISTS: "/account-savelists",
  LOGIN: "#",
  REGISTER: "#",
  CATEGORIES: "/categories",
  PRODUCT: "/product",
  PRODUCTS: "/products",
  COMPARE: "/compare",
  CATEGORY: "/category",
  ORDERS: "/account-order",
  BLOG: "/blog",
  SEARCH: "/search",
} as const;

// ----------------- Dynamic Routes -----------------
const DYNAMIC_ROUTES = {
  ORDER_CONFIRMATION: (orderId: string) =>
    `/checkout/${orderId}/order-confirmation`,
} as const;

// ----------------- Merge -----------------
export const ROUTES = {
  ...STATIC_ROUTES,
  ...DYNAMIC_ROUTES,
};

// ----------------- Types -----------------
export type StaticRouteKey = keyof typeof STATIC_ROUTES;
export type DynamicRouteKey = keyof typeof DYNAMIC_ROUTES;
export type RouteKey = StaticRouteKey | DynamicRouteKey;
