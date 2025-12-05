import { useEffect } from "react";
import { VariationsType } from "@/services/types";

const useProductAttributes = (
    variations: VariationsType,
    setAttributes: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
    useEffect(() => {
        if (variations) {
            const defaultAttributes: { [key: string]: string } = {};

            Object.keys(variations).forEach((variationName) => {
                const options = variations[variationName]?.options;

                if (options && options.length > 0) {
                    if (variationName === "color") {
                        const variationColor = options.find((item) => item.value === "Pink");
                        defaultAttributes[variationName] = variationColor
                            ? variationColor.value
                            : options[0].value;
                    } else if (variationName === "memory-storage") {
                        const variationStore = options.find((item) => item.value === "128GB");
                        defaultAttributes[variationName] = variationStore
                            ? variationStore.value
                            : options[0].value;
                    } else {
                        defaultAttributes[variationName] = options[0].value;
                    }
                }
            });

            setAttributes((prev) => ({
                ...defaultAttributes,
                ...prev,
            }));
        }
    }, [variations, setAttributes]);
};

export default useProductAttributes;