import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";
import dynamic from "next/dynamic";

const AddToCart = dynamic(() => import("@/components/product/add-to-cart"),  {ssr: false});

interface CompareActionsProps {
    product: Product;
}

const CompareActions: React.FC<CompareActionsProps> = ({ product }) => {
    const { product_type, slug } = product ?? {};

    return (
        <div className="px-4 md:px-6 pb-4 text-center justify-items-center w-full min-h-15">
            {product_type === "variable" ? (
                <Link
                    variant="button-detail"
                    href={{pathname:`${ROUTES.PRODUCT}/${slug}`}}
                    className="lg:min-w-[200px]"
                >
                    Choose Options
                </Link>
            ) : (
                <AddToCart
                    data={product}
                    variant="mercury"
                    className="lg:min-w-[200px]"
                />
            )}
        </div>
    );
};

export default CompareActions;