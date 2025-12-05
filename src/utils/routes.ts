
type RouteType = string; // Simplified, or use Route if available

export const ROUTES : Record<string, RouteType> = {
  HOME: '/',
  CHECKOUT: '/checkout',
  CART : '/cart',
  CONTACT: '/contact-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FAQ: '/faq',
  FORGET_PASSWORD: '/forget-password',
  CHANGE_PASSWORD: '/change-password',
  ACCOUNT: '/account',
  ACCOUNT_BILLING: '/account-billing',
  SAVELISTS: '/account-savelists',
  LOGIN: '/login',
  REGISTER: '/register',
  CATEGORIES : '/categories',
  PRODUCT: `/product`,
  PRODUCTS: '/products',
  COMPARE: '/compare',
  CATEGORY: '/category',
  ORDERS: '/account-order' ,
  ORDER: '/checkout/order-confirmation',
  BLOG: `/blog`,
  SEARCH: `/search`,
};
