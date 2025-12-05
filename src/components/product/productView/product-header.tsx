import React from "react";
import { Product } from "@/services/types";
import StarIcon from "@/components/icons/star-icon";

interface ProductHeaderProps {
    data: Product;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ data }) => {
    return (
        <>
            <div className="mb-2 md:mb-2.5 block">
                <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                    {data.name}
                </h2>
            </div>
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
                <span className="text-[13px] leading-4">(3 reviews)</span>
            </div>

        </>
    );
};

export default ProductHeader;