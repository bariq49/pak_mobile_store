export interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity?: number;
  stock?: number;
  /** Optional tax percentage from backend, e.g. 2, 4, 21 */
  tax?: number | null;
  /** Backend-computed original (effective) unit price before any deal or sale, used for strike-through and subtotals. */
  originalPrice?: number | null;
  /** Backend-computed deal unit price when a deal is applied; null or >= originalPrice when no active deal. */
  dealPrice?: number | null;
  /** Sale price for products on sale (when sale_price < price, price is the original) */
  sale_price?: number | null;
  /** Computed per-item base total (price * quantity, without tax) */
  itemBaseTotal?: number;
  /** Computed per-item tax total */
  itemTaxTotal?: number;
  /** Computed per-item grand total (base + tax) */
  itemTotal?: number;
  /** Backend cart item identifier (most reliable for removal) */
  _id?: string | number;
  /** Backend product ID */
  productId?: string | number;
  /** Backend variant ID (for variable products) */
  variantId?: string | number;
  [key: string]: any;
}

/**
 * Convert tax value from backend API to number
 * Handles string numbers, numbers, null, undefined, empty strings
 */
export function convertTaxToNumber(tax: any): number | null {
  // If already a number and valid
  if (typeof tax === "number" && !isNaN(tax) && tax >= 0) {
    return tax;
  }
  
  // If string, try to parse
  if (typeof tax === "string" && tax.trim() !== "") {
    const parsed = parseFloat(tax.trim());
    if (!isNaN(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  
  // Return null for invalid values
  return null;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number,
) {
  if (quantity <= 0)  throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id,
  );
  
  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item['id'],
  quantity: number,
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item['id'],
  item: UpdateItemInput,
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem,
  );
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  if (item) return (item.quantity || 0) < (item.stock ?? 0); // Handle undefined stock and quantity
  return false;
}

/**
 * Calculate tax-aware totals for a single product line.
 *
 * - tax is treated as a percentage (e.g. 4 = 4%)
 * - tax is optional; if missing/0, only price is used
 */
export function calculateProductTotalsWithTax(
  price: number,
  quantity: number,
  tax?: number | null | string
) {
  const safeQuantity = quantity > 0 ? quantity : 1;
  const safePrice = price || 0;
  // Convert tax to number if it's a string from API
  const taxNumber = convertTaxToNumber(tax);
  const taxRate = taxNumber !== null && taxNumber > 0 ? taxNumber : 0;

  const baseTotal = safePrice * safeQuantity;
  const taxTotal = taxRate
    ? safePrice * (taxRate / 100) * safeQuantity
    : 0;
  const productTotal = baseTotal + taxTotal;

  return {
    baseTotal,
    taxTotal,
    productTotal,
    taxRate,
  };
}

/** Helper to get tax-aware totals for a full cart item */
function getItemTotals(item: Item) {
  const quantity = item.quantity ?? 1;
  
  // Check if dealPrice exists and is valid (not null, > 0, and < originalPrice)
  const hasBackendDeal =
    typeof item.originalPrice === "number" &&
    item.originalPrice > 0 &&
    typeof item.dealPrice === "number" &&
    item.dealPrice !== null &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  // Use dealPrice if valid, otherwise use originalPrice, fallback to price
  const effectivePrice = hasBackendDeal && typeof item.dealPrice === "number"
    ? item.dealPrice
    : (typeof item.originalPrice === "number" && item.originalPrice > 0
        ? item.originalPrice
        : item.price);

  return calculateProductTotalsWithTax(effectivePrice, quantity, item.tax);
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => {
    // Convert tax to number if it comes as string from backend API
    const itemTax = convertTaxToNumber(item.tax);
    const { baseTotal, taxTotal, productTotal, taxRate } = getItemTotals(item);

    const result = {
      ...item,
      // Preserve tax as number from item if it exists, otherwise use calculated rate (which will be 0)
      tax: itemTax ?? taxRate,
      itemBaseTotal: baseTotal,
      itemTaxTotal: taxTotal,
      // itemTotal now includes tax when applicable
      itemTotal: productTotal,
    };

    return result;
  });

/** Grand total for all items (base + tax for each line) */
export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + getItemTotals(item).productTotal, 0);

/** Subtotal without tax (sum of base totals) */
export const calculateSubtotalWithoutTax = (items: Item[]) =>
  items.reduce((total, item) => total + getItemTotals(item).baseTotal, 0);

/** Total tax amount across all items */
export const calculateTaxTotal = (items: Item[]) =>
  items.reduce((total, item) => total + getItemTotals(item).taxTotal, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
