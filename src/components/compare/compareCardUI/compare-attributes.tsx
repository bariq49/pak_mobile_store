import React from "react";
import { Check, X } from "lucide-react";
import { Product } from "@/services/types";
import { useCompare } from '@/hooks/use-compare';
import { useCart } from "@/hooks/use-cart";

interface CompareAttributesProps {
    product: Product;
}

const CompareAttributes: React.FC<CompareAttributesProps> = ({ product }) => {
    const { compareProductStatus } = useCompare();
    const { useCartHelpers } = useCart();
    const { storageOptions } = compareProductStatus(product);
    const {outOfStock} = useCartHelpers();
    const statusOutOfStock = outOfStock(product.id);

    const { brand, unit, model, operating, screen } = product ?? {};

    return (
        <div className="px-4 md:px-6 pb-6">
            <div className="mt-4 space-y-4 text-sm">
                <div className="flex gap-2">
                    <span className="font-medium md:min-w-24">Availability:</span>
                    <div className="flex items-center gap-1">
                        {!statusOutOfStock ? (
                            <>
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-green-600">In Stock</span>
                            </>
                        ) : (
                            <>
                                <X className="h-4 w-4 text-red-500" />
                                <span className="text-red-600">Out of Stock</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="font-medium md:min-w-24">Brand:</span>
                    <span>{brand || unit || "-"}</span>
                </div>
                {model && (
                    <div className="flex gap-2">
                        <span className="font-medium md:min-w-24">Model:</span>
                        <span>{model}</span>
                    </div>
                )}
                {operating && (
                    <div className="flex gap-2">
                        <span className="font-medium md:min-w-24">OS:</span>
                        <span>{operating}</span>
                    </div>
                )}
                {screen && (
                    <div className="flex gap-2">
                        <span className="font-medium md:min-w-24">Screen:</span>
                        <span>{screen}</span>
                    </div>
                )}
                <div className="flex gap-2">
                    <span className="font-medium md:min-w-24">Storage:</span>
                    <span>{storageOptions}</span>
                </div>
            </div>
        </div>
    );
};

export default CompareAttributes;