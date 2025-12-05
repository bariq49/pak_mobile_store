import React, {useMemo} from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";
import {useCart} from "@/hooks/use-cart";

const AddToCart =  React.lazy(() => import("@/components/product/add-to-cart"));

interface ProductActionsProps {
    product: Product;
    variant?: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
                                                           product,
                                                           variant="mercury"
                                                       }) => {
    const { id, product_type, slug, quantity } = product;
    const { useCartHelpers } = useCart();
    const {outOfStock} = useCartHelpers();
    const statusOutOfStock = outOfStock(id);
    
    const btnVariant = useMemo(() => {
        if (variant === 'furni') return 'btnFurni-detail';
        return 'button-detail';
    }, [variant]);
    return (
            <div className="product-cart-button flex justify-center">
                {statusOutOfStock || quantity < 1 ? null : product_type === "variable" ? (
                    <Link variant={btnVariant} href={`${ROUTES.PRODUCT}/${slug}`}>
                        Choose Options
                    </Link>
                ) : (
                    <AddToCart data={product} variant={variant} />
                )}
            </div>
    );
};

export default ProductActions;