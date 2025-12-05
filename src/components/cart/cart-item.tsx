'use client'
import { TableCell, TableRow } from "@/components/shared/table"
import { useCart } from '@/hooks/use-cart';
import usePrice from "@/services/product/use-price";
import Counter from "@/components/shared/counter";
import {ROUTES} from "@/utils/routes";
import Link from "@/components/shared/link";
import Image from '@/components/shared/image';
import {Item} from "@/services/utils/cartUtils";

interface CartItemProps {
	item: Item
}

export function CartItem({ item }: CartItemProps) {
	const {id,name, image, quantity, slug, product_type} = item ?? {};

    // Use new hooks
	const {
		addItemWithQuantity,
		removeItemOrQuantity,
		removeItem,
		useCartHelpers
	} = useCart();
	
	const {price, basePrice} = usePrice({
		amount: item?.sale_price ? item?.sale_price : item?.price,
		baseAmount: item?.price,
		currencyCode: 'USD'
	});
	
	const {price: minPrice} = usePrice({
		amount: item?.min_price ?? 0,
		currencyCode: 'USD',
	});
	const {price: maxPrice} = usePrice({
		amount: item?.max_price ?? 0,
		currencyCode: 'USD',
	});
	
	const {price: totalPrice} = usePrice({
		amount: item?.itemTotal,
		currencyCode: 'USD',
	});
	
	const { isInStock, isInCart } = useCartHelpers(); // Get helpers
	const outOfStock = isInCart(item?.id) && !isInStock(item.id);
	
	return (
		<TableRow>
			<TableCell>
				<div className="w-20 h-20 relative">
                    <Link
                    href={{pathname:`${ROUTES.PRODUCT}/${slug}`}}
                    className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
                    >
                        <Image
						src={image}
						width={80}
						height={80}
						alt={name || 'Product Image'}
						className="object-contain" />
                    </Link>
				</div>
			</TableCell>
			<TableCell>
				    <Link
                       href={{pathname:`${ROUTES.PRODUCT}/${slug}`}}
                        className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
                    >
                        {item?.name}
                    </Link>

                   
                    <Link
						href={{pathname:`${ROUTES.PRODUCT}/${slug}`}}
                        onClick={() => removeItem(id)}
                        className="mt-1 inline-block cursor-pointer transition-all text-gray-500 text-13px underline"
                    >
                        Remove
                    </Link>
			</TableCell>
			<TableCell>
				<div className="space-s-2  mt-2 block mb-2">
					<span className="inline-block font-semibold ">
					  {product_type === 'variable'
						  ? `${minPrice} - ${maxPrice}`
						  : price}
					</span>
					{basePrice && (
						<del className="mx-1  text-gray-400 text-opacity-70">
							{basePrice}
						</del>
					)}
				</div>
			</TableCell>
			<TableCell>
				<Counter
					value={quantity}
					onIncrement={() => addItemWithQuantity(item, 1)}
					onDecrement={() => removeItemOrQuantity(id)}
					variant="cart"
					disabled={outOfStock}
				/>
			</TableCell>
			<TableCell>
				<div className=" font-semibold text-brand-dark mt-2 block mb-2">
					{totalPrice}
				</div>
			</TableCell>
		</TableRow>
	)
}

