import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";

interface CompareDetailsProps {
    product: Product;
}

const CompareDetails: React.FC<CompareDetailsProps> = ({ product }) => {
    const { name, slug } = product;

    return (
        <Link
            href={`${ROUTES.PRODUCT}/${slug}`}
            className="text-brand-dark font-semibold text-sm md:text-lg leading-6 min-h-[40px] line-clamp-2 mt-1 mb-2"
        >
            {name}
        </Link>
    );
};

export default CompareDetails;