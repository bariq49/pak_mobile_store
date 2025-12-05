import React from "react";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import Button from "@/components/shared/button";
import { X } from "lucide-react";

interface CompareImageProps {
    product: Product;
    removeCompare: (id: number) => void;
}

const CompareImage: React.FC<CompareImageProps> = ({ product, removeCompare }) => {
    const { name, image, id } = product;

    return (
        <div className="relative py-6">
            <Button
                variant="border"
                className="absolute top-3 right-3 z-10 xs:p-2 xs:h-9 xs:rounded-full xs:border-0 hover:bg-gray-200 !text-brand-dark"
                onClick={() => removeCompare(id as number)}
            >
                <X size={20} strokeWidth={2} />
                <span className="sr-only">Remove from comparison</span>
            </Button>
            <div className="relative card-img-container overflow-hidden flex item-center w-full">
                <Image
                    src={image?.thumbnail ?? productPlaceholder}
                    alt={name || "Product Image"}
                    width={380}
                    height={380}
                />
            </div>
        </div>
    );
};

export default CompareImage;