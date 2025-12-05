import isEmpty from 'lodash/isEmpty';
import {Product, VariationOption} from "@/services/types";

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
    return (data as Product).image !== undefined && typeof (data as Product).image !== "string";
}
export function constructCartItem(item: Item | Product, variation: VariationOption) {
    const {id, name, slug, image, price, sale_price, quantity, unit} = item ?? {};


    // Normalize image to string using type guard
    const imageString: string = isProduct(item) ? item.image.thumbnail ?? "" : (image as string) ?? "";

    if (!isEmpty(variation)) {
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
        };
    }
    return {
        id,
        name,
        slug,
        unit,
        image: imageString,
        stock: quantity ?? 0, // Default to 0 if undefined
        price: sale_price ?? price,
    };
}
