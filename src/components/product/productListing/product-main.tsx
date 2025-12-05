import  {FC, useEffect, useState} from 'react';
import ProductCard from '@/components/product/productListing/productCards/product-card';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import ProductCardList from '@/components/product/productListing/productCards/product-list';
import {LIMITS} from '@/services/utils/limits';
import {Product} from '@/services/types';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";

interface ProductGridProps {
	data?: Product[]; // Adjust based on your actual data structure
	isLoading: boolean;
	className?: string;
	viewAs: boolean;
}

export const ProductMain: FC<ProductGridProps> = ({data,isLoading,className = '', viewAs}) => {
	
	const limit = LIMITS.PRODUCTS_LIMITS;
	const [currentPage, setCurrentPage] = useState(1);
	const countPerPage = limit;
	
	// Ensure filterData is always an array, default to empty array if data is undefined
	const [filterData, setFilterData] = useState<Product[]>([]);
	
	// Sync filterData when data or currentPage changes
	useEffect(() => {
		if (Array.isArray(data) && data.length > 0) {
			const to = countPerPage * currentPage;
			const from = to - countPerPage;
			setFilterData(data.slice(from, to));
		} else {
			setFilterData([]); // Fallback to empty array if no data
		}
	}, [data, currentPage, countPerPage]);
	
	const updatePage = (p: number) => {
		setCurrentPage(p);
	};
	
	return (
		<>
			{isLoading ? (
				<div className={`${viewAs  ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5': 'grid grid-cols-1 gap-1.5'} ${className}`}>
					{Array.from({length: limit}).map((_, idx) => (
							<div className="p-2 h-full rounded bg-white" key={`product--key-${idx}`}>
								<ProductCardLoader uniqueKey={`product--key-${idx}`}/>
							</div>
						))
					}
				</div>
			) : (
				!data?.length ? (
					<div className=" w-full flex flex-col items-center justify-center py-16 lg:py-30 bg-white rounded-md">
						<h2 className="text-xl  font-semibold text-brand-dark mb-10">Products Not Showing Up</h2>
						
						<Link href={ROUTES.HOME} variant={"button-primary"} className={"min-w-60"}>
							Continue shopping
						</Link>
					</div>
				) : (
					<div className={`${viewAs  ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5  gap-1.5': 'grid grid-cols-1 gap-1.5'} ${className}`}>
						{filterData.map((product: Product) => (
								viewAs ? (
									<ProductCard
										key={`product--key-${product.id}`}
										product={product}
									/>
								) : (
									<ProductCardList
										key={`product--key-${product.id}`}
										product={product}
									/>
								)
							))
						}
					</div>
				)
			)}
			
			<Pagination
				current={currentPage}
				onChange={updatePage}
				pageSize={countPerPage}
				total={Array.isArray(data) ? data.length : 0} // Fallback to 0 if data is not an array
				prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
				nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
				className="blog-pagination bg-white rounded xs:mt-2"
			/>
			
			
		</>
	);
};
