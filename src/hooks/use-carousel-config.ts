import { useMemo } from "react";

const useCarouselConfig = (
    variant?: string
) => {
    const spaceBetween = useMemo(() => {
        return ["furniture", "furniture2"].includes(variant ?? '') ? 20 : 0;
    }, [variant]);

    const breakpoints = useMemo(() => {
        switch (variant) {
            case "cardList":
                return {
                    1536: { slidesPerView: 5 },
                    1280: { slidesPerView: 4 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 2 },
                    360: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                };
            case "outBorder":
                return {
                    1536: { slidesPerView: 6 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            case "furniture2":
                return {
                    1536: { slidesPerView: 5 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            case "furniture":
                return {
                    1536: { slidesPerView: 6 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            default:
                return {
                    1536: { slidesPerView: 7 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
        }
    }, [variant]);

    return { spaceBetween, breakpoints };
};

export default useCarouselConfig;