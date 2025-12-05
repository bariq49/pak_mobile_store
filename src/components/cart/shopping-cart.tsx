'use client'
import { useCart } from '@/hooks/use-cart';

import React, {useState} from "react";
import {CartItemList} from "@/components/cart/cart-item-list";

import {OrderSummary} from "@/components/cart/order-summary";
import EmptyCart from "@/components/cart/empty-cart";
import {useIsMounted} from "@/utils/use-is-mounted";
import Loading from "@/components/shared/loading";

const ShoppingCart: React.FC = () => {
	const {items: cartItems, total:subtotal, isEmpty} = useCart();
	const mounted = useIsMounted();
	
	// Shipping options
	const shippingOptions = [
		{ id: "flat", label: "Flat rate", price: 20.0 },
		{ id: "local", label: "Local pickup", price: 25.0 },
		{ id: "free", label: "Free shipping", price: 0 },
	]
	
	const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);
	
	// Get selected shipping cost
	const shippingCost = shippingOptions.find((option) => option.id === selectedShipping)?.price || 0;
	
	// Calculate total
	const total = subtotal + shippingCost;
	
	if (!mounted) {
		return <Loading/>; // Render nothing during SSR
	}
	
	if (isEmpty) {
		return (
			<div className="flex flex-col items-center justify-center py-16 lg:py-30 bg-white rounded-md">
				<EmptyCart/>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
			{/* Left Section - Cart Items */}
			<div className="bg-white w-full px-5 md:p-8  rounded-lg space-y-6 border border-border-base ">
				<CartItemList items={cartItems}/>
			</div>

			{/* Right Section - Order Summary */}
			<div className="">
				<OrderSummary
					subtotal={subtotal}
					shippingOptions={shippingOptions}
					selectedShipping={selectedShipping}
					setSelectedShipping={setSelectedShipping}
					total={total}
				/>
			</div>
		</div>
	);
	
}
export default ShoppingCart;
