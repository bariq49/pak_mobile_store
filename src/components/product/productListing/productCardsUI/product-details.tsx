import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import StarIcon from "@/components/icons/star-icon";
import { ROUTES } from "@/utils/routes";
import cn from "classnames";

interface ProductDetailsProps {
    product: Product;
    variant?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product,variant="default" }) => {
    const { name, slug } = product;
    
    return (
        <>
            <Link
                href={`${ROUTES.PRODUCT}/${slug}`}
                className={cn("  leading-5  line-clamp-2 mt-1 mb-2",
                    {
                        "text-brand-dark text-sm min-h-[40px]": variant === "default" || variant === "large",
                        "text-fill-purple text-sm min-h-[40px]": variant === "outBorder" || variant === "cardList" ,
                        "text-brand-dark text-base font-semibold min-h-[30px]": variant === "list" || variant === "bestdeal"  ,
                        "text-fill-purple text-sm dark:text-black min-h-[40px]": variant === "furni"
                    })}
            >
                {name}
            </Link>
            <div className="flex text-gray-500 space-x-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                        <StarIcon
                            key={idx}
                            color={idx < 5 ? "#F3B81F" : "#DFE6ED"}
                            className="w-3 h-3 mx-px"
                        />
                    ))}
                </div>
                <span className="text-[13px] leading-4">(2 reviews)</span>
            </div>
        </>
    );
};

export default ProductDetails;