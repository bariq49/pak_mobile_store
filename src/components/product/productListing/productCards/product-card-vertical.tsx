import React from "react";
import cn from 'classnames';
import Image from '@/components/shared/image';
import {Product} from '@/services/types';
import {productPlaceholder} from '@/assets/placeholders';
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import { useCart } from "@/hooks/use-cart";

interface ProductProps {
	product: Product;
	className?: string;
	variant?: string;
}

const ProductCardVertical: React.FC<ProductProps> = ({
	                                                     product,
	                                                     className,
	                                                     variant = "default"
	                                                     }) => {
	const { name, image, id, quantity } = product ?? {};
	const { useCartHelpers } = useCart();
	const { outOfStock } = useCartHelpers();
	const isOutOfStock = outOfStock(id) || (quantity ?? 0) < 1;
	
	return (
		<article
			className={cn(
				'product-card overflow-hidden relative grid grid-cols-8 gap-3', {
					'pt-3 pb-3'  : variant ==='cardList',
				},
				className,
			)}
		>
			<div className="col-span-2 md:col-span-2 xl:col-span-3 relative product-card-img">
				<div className="card-img-container overflow-hidden rounded relative">
					<Image
						src={image?.thumbnail ?? productPlaceholder}
						alt={name || 'Product Image'}
						width={105}
						height={105}
						className=""
					/>
					{isOutOfStock && (
						<span className="absolute top-1 left-1 z-10 text-[9px] font-medium text-brand-light uppercase inline-block bg-brand-dark dark:bg-white rounded-sm px-1.5 pt-0.5 pb-[2px]">
							Out of Stock
						</span>
					)}
				</div>
			</div>
			
			<div className="col-span-6 md:col-span-6 xl:col-span-5 relative product-card-content">
				<ProductDetails product={product} variant={variant}/>
				<ProductPricing product={product} variant={variant}/>
			</div>
		</article>
	);
};

export default ProductCardVertical;
