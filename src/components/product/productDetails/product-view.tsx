import React, { useRef, useState} from "react";
import {Product, Variation} from "@/services/types";
import cn from "classnames";
import ProductHeader from "@/components/product/productView/product-header";
import ProductPricing from "@/components/product/productView/product-pricing";
import ProductInfo from "@/components/product/productView/product-info";
import ProductQuantity from "@/components/product/productView/product-quantity";
import ProductActions from "@/components/product/productView/product-actions";
import ProductFooter from "@/components/product/productView/product-footer";
import StickyCart from "@/components/product/productView/sticky-cart";
import useProductVariations from "@/hooks/use-product-variations";
import { useCart } from "@/hooks/use-cart";
import ProductAttributes from "@/components/product/productView/product-attributes";

interface ViewProps {
	className?: string;
	data?: Product;
	variant?: string;
	attributes: { [key: string]: string }; // Make required
	setAttributes: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // Required
	useVariations?: Variation[];
}

const ProductView: React.FC<ViewProps> = ({ data, className,variant,useVariations,attributes,setAttributes }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [isCartVisible, setCartVisible] = useState<boolean>(false);
	const targetButtonRef = useRef<HTMLButtonElement>(null);

	const { variations, selectedVariation, isSelected, errorAttributes } = useProductVariations(data, useVariations, attributes);
	const { useCartActions, useCartHelpers } = useCart();
	const { addToCart, addToCartLoader } = useCartActions(
		data,
		selectedVariation,
		selectedQuantity
	);
	const { isInStock, isInCart, getItemFromCart } = useCartHelpers();
  if (!data) return null;

	return (
		<div className={cn("flex flex-col shrink-0", className)}>
			<ProductHeader data={data} />
			<ProductPricing data={data} selectedVariation={selectedVariation} />
			{variant !=='quickview' && <ProductInfo data={data} />}
			<ProductAttributes
				variations={variations}
				attributes={attributes}
				setAttributes={setAttributes}
				error={errorAttributes}
			/>
			<ProductQuantity
				data={data}
				selectedVariation={selectedVariation}
				selectedQuantity={selectedQuantity}
				setSelectedQuantity={setSelectedQuantity}
				isInCart={() => isInCart(data.id)}
				isInStock={() => isInStock(data.id)}
				getItemFromCart={() => getItemFromCart(data.id)}
			/>
			<ProductActions
				data={data}
				addToCart={addToCart}
				addToCartLoader={addToCartLoader}
				selectedVariation={selectedVariation}
				isInCart={() => isInCart(data.id)}
				isInStock={() => isInStock(data.id)}
				isSelected={isSelected}
				targetButtonRef={targetButtonRef}
			/>
			<ProductFooter />
			<StickyCart
				product={data}
				addToCartLoader={addToCartLoader}
				handleAddToCart={addToCart}
				isCartVisible={isCartVisible}
				setCartVisible={setCartVisible}
				targetButtonRef={targetButtonRef}
				isSelected={isSelected}
			/>
		</div>
	);
};

export default ProductView;