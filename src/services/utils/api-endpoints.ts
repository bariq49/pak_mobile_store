const BASE_URL = "https://emberidge-backend.vercel.app";

export const API_RESOURCES = {
  // Categories & Products
  CATEGORIES: `${BASE_URL}/api/v1/categories`,
  PRODUCTS: `${BASE_URL}/api/v1/products`,
  PRODUCTS_BY_CATEGORIES: `${BASE_URL}/api/v1/products/category`,
  PRODUCTS_BY_SUB_CATEGORIES: `${BASE_URL}/api/v1/products/categories`,
  NEW_SELLER_PRODUCTS: `${BASE_URL}/api/v1/products/new-arrival`,
  BEST_SELLER_PRODUCTS: `${BASE_URL}/api/v1/products/best-seller`,
  POPULAR_PRODUCTS: `${BASE_URL}/api/v1/products/deals`,
  SALE_PRODUCTS: `${BASE_URL}/api/v1/products/on-sale`,
  RELATED_PRODUCTS: `${BASE_URL}/api/v1/products`,

  // Deals & Offers
  DEALS: `${BASE_URL}/api/v1/deals`,

  // User & Auth
  USER: `${BASE_URL}/api/v1/users/me`,
  ADDRESSES: `${BASE_URL}/api/v1/users/me/addresses`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/update-password`,
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,

  // Reviews & Votes
  REVIEWS: `${BASE_URL}/api/v1/products`,
  VOTE: `${BASE_URL}/api/v1/products/reviews`,

  // Orders & Wishlist
  ORDERS: `${BASE_URL}/api/v1/orders`,
  WISHLIST: `${BASE_URL}/api/v1/wishlist`,
  ADD_WISHLIST: `${BASE_URL}/api/v1/wishlist/add`,
  REMOVE_WISHLIST: `${BASE_URL}/api/v1/wishlist/remove`,
  CART: `${BASE_URL}/api/v1/cart`,

  // Mock/Static JSON files (for testing/demo)
  PRODUCT: "/product.json",
  ELETRONIC_PRODUCTS: "/products_electronic.json",
  FASHION_PRODUCTS: "/products_fashion.json",
  BABY_KIDS_PRODUCTS: "/products_baby_kids.json",
  ELECTRONIC_CATEGORY: "/category_electronic.json",
  SEARCH: "/search.json",
  ORDER: "/order.json",
  ORDER_STATUS: "/order-status.json",
  BLOGS: "/blog.json",
  BLOGDETAILS: "/blogDetails.json",
  THIS_WEEK_PRODUCTS: "/products_furniture_this_week.json",
  TOPSELL_PRODUCTS: "/products_furniture_topsell.json",
};
