// 📁 hooks/useCompare.ts
import { useCompareStore } from '@/stores/useCompareStore'
import { Product } from "@/services/types";

interface Variation {
    attribute: { slug: string };
    value: string;
}

export const useCompare = () => {
    const compareList = useCompareStore((state) => state.compareList);
    const addToCompare = useCompareStore((state) => state.addToCompare);
    const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
    const clearCompare = useCompareStore((state) => state.clearCompare);

    const compareProductStatus = (product: Product) => {
        const { variations } = product;

        const getStorageOptions = () => {
            if (
                variations?.some((v: Variation) => v.attribute.slug === "memory-storage")
            ) {
                return variations
                    .filter((v: Variation) => v.attribute.slug === "memory-storage")
                    .map((v: Variation) => v.value)
                    .join(", ");
            }
            return "-";
        };

        return {
            storageOptions: getStorageOptions(),
        };
    };


    return {
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        compareProductStatus
    };
};
