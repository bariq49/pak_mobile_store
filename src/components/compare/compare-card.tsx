import React from "react";
import { Product } from "@/services/types";
import CompareImage from "@/components/compare/compareCardUI/compare-image";
import CompareDetails from "@/components/compare/compareCardUI/compare-details";
import ComparePricing from "@/components/compare/compareCardUI/compare-pricing";
import CompareAttributes from "@/components/compare/compareCardUI/compare-attributes";
import CompareActions from "@/components/compare/compareCardUI/compare-actions";

interface Props {
    product: Product;
    removeCompare: (id: number) => void;
}

const CompareCard: React.FC<Props> = ({ product, removeCompare }) => {
    return (
        <div className="overflow-hidden border border-border-two rounded-md">
            <CompareImage product={product} removeCompare={removeCompare} />
            <CompareActions product={product} />

            <div className="px-4 md:px-6  text-center ">
                <CompareDetails product={product} />
                <ComparePricing product={product} />
            </div>

            <CompareAttributes product={product} />
        </div>
    );
};

export default CompareCard;