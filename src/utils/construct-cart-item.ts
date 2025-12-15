import isEmpty from "lodash/isEmpty";
import { Product, VariationOption } from "@/services/types";
import { convertTaxToNumber } from "@/services/utils/cartUtils";

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  price: number;
  sale_price?: number;
  quantity?: number;
  stock?: number; // Ensure stock is optional
  productId?: string | number; // Add productId to match usage
  variationId?: number; // Add variationId to match usage
  unit?: string; // Add unit to match usage
  [key: string]: unknown;
}
function isProduct(data: Item | Product): data is Product {
  return (
    (data as Product).image !== undefined &&
    typeof (data as Product).image !== "string"
  );
}
export function constructCartItem(
  item: Item | Product,
  variation?: VariationOption | null
) {
  // Extract all fields including tax from product/item
  const { id, name, slug, image, price, sale_price, quantity, unit, tax } =
    item ?? {};

  // Normalize image to string using type guard
  const imageString: string = isProduct(item)
    ? item?.image?.thumbnail ?? ""
    : (image as string) ?? "";

  // IMPORTANT: Extract tax directly from product object if it's a Product type
  // Sometimes destructuring might miss it, so check the original object
  const taxFromProduct = isProduct(item) 
    ? (item as Product).tax ?? tax
    : tax;

  // Tax always comes from product level (variants don't have tax in API response)
  // Convert tax to number if it comes as string from backend API
  const productTax = convertTaxToNumber(taxFromProduct);

  // Handle variable products with variation
  if (variation && !isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      slug,
      unit,
      stock: variation.quantity ?? 0, // Default to 0 if undefined
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: imageString,
      variationId: variation.id,
      // Tax always comes from product (variants don't have tax in API response)
      tax: productTax,
    };
  }
  
  // Handle simple products (no variation)
  return {
    id,
    name,
    slug,
    unit,
    image: imageString,
    stock: quantity ?? 0, // Default to 0 if undefined
    price: sale_price ?? price,
    // Include tax from product
    tax: productTax,
  };
}
