
import React from "react";
import Image from "@/components/shared/image";
import CloseIcon from "../icons/close-icon";
import {Product} from "@/services/types";
import {ROUTES} from "@/utils/routes";
import {productPlaceholder} from "@/assets/placeholders";

import Link from "@/components/shared/link";
import ComparePricing from "@/components/compare/compareCardUI/compare-pricing";

interface Props {
    product : Product;
    removeCompare: (id: number) => void;
}

const CompareCardDrawer: React.FC<Props> = ({ product, removeCompare }) => {
    const {id, name, image, slug} = product;

    return (
        <div className="bg-gray-100 rounded-lg group flex items-center  gap-4 p-4 relative">
             <div
                    onClick={() => removeCompare(id as number)}
                    className="absolute rounded p-3 top-0 end-0 z-10 cursor-pointer "
                >
                    <CloseIcon className="w-4 h-4"/>
            </div>
            <div className="product-item__img">
                <Image  src={image?.thumbnail ?? productPlaceholder} width={80} height={80}   alt={name || 'Product Image'}/>
            </div>
            <div className=" w-full pr-5">
                <Link
                    href={`${ROUTES.PRODUCT}/${slug}`}
                    className="text-brand-dark  text-sm leading-5 min-h-[40px] line-clamp-2 mb-1"
                >
                    {name}
                </Link>
                <ComparePricing product={product} />
            </div>
        
        
        </div>
    );
}

export default CompareCardDrawer;
