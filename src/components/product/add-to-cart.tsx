"use client"

import {useCart} from '@/hooks/use-cart';
import {constructCartItem} from '@/utils/construct-cart-item';
import {ImSpinner2} from "react-icons/im";
import cn from "classnames";
import { usePanel } from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import {Product, VariationOption} from "@/services/types";

interface Props {
	data: Product;
	variation?: VariationOption;
	disabled?: boolean;
	className?: string;
	variant?: string;
}

const AddToCart = ({
	                   data,
	                   variation,
	                   disabled,
					   className,
	                   variant = 'mercury',
                   }: Props) => {
	const {selectedColor} = usePanel();
	
	const { useCartActions, useCartHelpers } = useCart();
	const { isInStock, isInCart } = useCartHelpers(); // Get helpers
	const { addToCart, addToCartLoader } = useCartActions(data, variation,);
	const item = constructCartItem(data!, variation!);
	const outOfStock = isInCart(item?.id) && !isInStock(item.id);
	
	return (
		<button
			className={cn(
				" min-w-[150px]  px-4 py-2 flex  relative leading-6 font-medium text-brand-light rounded-full text-[13px] items-center justify-center transition-all ",
				className,
				{
					'sm:text-white/30': addToCartLoader,
					[`xs:rounded-none w-full  ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`]: variant === 'furni',
					'bg-brand-dark xs:rounded-md hover:bg-gray-800': variant === 'dark',
					[`${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`]: variant === 'mercury',
				}
			)}
			aria-label="Count Button"
			onClick={addToCart}
			disabled={disabled || outOfStock}
		>
			{outOfStock ? "Out Of Stock": " Add To Cart"}
			{addToCartLoader && (
				<ImSpinner2 className="w-5 h-5 animate-spin  absolute  text-white "/>
			)}
		</button>
	)
};

export default AddToCart;
