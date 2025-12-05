import React from "react";
import { HelpCircle, Share2, TruckIcon } from "lucide-react";
import TrustSeal from "@/components/shared/trust-seal";

const ProductFooter: React.FC = () => {
    return (
        <div className="space-y-8 mt-8">
            <div className="hidden items-center gap-5 md:gap-8 text-brand-dark font-medium">
                <button className="flex items-center text-sm gap-1">
                    <HelpCircle size={18} />
                    Ask a question
                </button>
                <button className="flex items-center text-sm gap-1">
                    <TruckIcon size={18} />
                    Delivery & Return
                </button>
                <button className="flex items-center text-sm gap-1">
                    <Share2 size={18} />
                    Share
                </button>
            </div>
            <TrustSeal />
        </div>
    );
};

export default ProductFooter;