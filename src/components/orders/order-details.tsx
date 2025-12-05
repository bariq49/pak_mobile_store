import {useOrderQuery} from '@/services/order/get-order';
import usePrice from '@/services/product/use-price';
import {OrderItem} from '@/services/types';
import {Printer} from "lucide-react";
import React from "react";
import Image from "next/image";

const OrderItemCard = ({product}: { product: OrderItem }) => {
	const {price: itemTotal} = usePrice({
		amount: product.price * product.quantity,
		currencyCode: 'USD',
	});
	return (
		<div className="flex gap-4" key={product.id}>
			<div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
				<Image
					src={product?.image?.thumbnail}
					alt="Product image"
					width={64}
					height={64}
					className="rounded-md"
				/>
			</div>
			<div className="flex-1">
				<p className="text-brand-dark text-15px">
				<span className="font-medium">{product.quantity} x </span>
					{product.name}
				</p>
			</div>
			<div className="text-brand-dark text-end">
				<p className="font-semibold">{itemTotal}</p>
			</div>
		</div>
)
	;
};

const OrderDetails: React.FC<{ className?: string; }> = ({
	                                                         className = 'pt-0 ',
                                                         }) => {
	const {data: order, isLoading} = useOrderQuery('1');
	const {price: subtotal} = usePrice(
		order && {
			amount: order.total,
			currencyCode: 'USD',
		},
	);
	const {price: total} = usePrice(
		order && {
			amount: order.shipping_fee
				? order.total + order.shipping_fee
				: order.total,
			currencyCode: 'USD',
		},
	);
	const {price: shipping} = usePrice(
		order && {
			amount: order.shipping_fee,
			currencyCode: 'USD',
		},
	);
	if (isLoading) return <p>Loading...</p>;
	
	return (
		<div className={"px-5 py-5"}>
			<div className="flex items-center justify-between pb-4 mb-5  border-b border-border-base">
				<h2 className="text-xl font-medium text-brand-dark">Order Summary</h2>
				<button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
					<Printer className="w-4 h-4 mr-1"/>
					<span>Print</span>
				</button>
			</div>
			
			<div className=" border-b border-border-base pb-5">
				<div className={"space-y-4"}>
				{order?.products.map((product, index) => (
					<OrderItemCard key={index} product={product}/>
				))}
				</div>
			</div>
			<div className="space-y-2 mt-5 text-brand-dark">
				<div className="flex justify-between">
					<p className="m-0">Subtotal</p>
					<p className="font-semibold">{subtotal}</p>
				</div>
				<div className="flex justify-between">
					<p className="m-0">Shipping</p>
					<p className="font-semibold">{shipping}</p>
				</div>
				<div className="flex justify-between items-center text-brand-dark">
					<p className="m-0  font-bold">Order total</p>
					<p className="text-2xl font-bold">{total}</p>
				</div>
			</div>
			
			
		
		</div>
	);
};

export default OrderDetails;
