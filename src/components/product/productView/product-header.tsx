import React from "react";
import { Product } from "@/services/types";
import { Star } from "lucide-react";

interface ProductHeaderProps {
  data: Product;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ data }) => {
  const rating =
    typeof data.ratingsAverage === "number" ? data.ratingsAverage : 0;
  const reviewCount =
    typeof data.ratingsQuantity === "number" ? data.ratingsQuantity : 0;


  return (
    <div className="space-y-2">
      {/* Product Name */}
      <h2 className="text-lg font-semibold text-brand-dark md:text-xl xl:text-2xl">
        {data.name}
      </h2>

      {/* Rating + Reviews */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => {
            const starValue = idx + 1;
            const isFull = starValue <= rating;
            const isHalf = !isFull && starValue - 0.5 <= rating;

            return (
              <div key={idx} className="relative inline-block mx-px">
                <Star
                  stroke="#DFE6ED"
                  fill="white"
                  size={16}
                  className="relative"
                />
                {rating > 0 && (
                  <>
                    {isFull ? (
                      <Star
                        fill="#F3B81F"
                        stroke="#F3B81F"
                        size={16}
                        className="absolute inset-0"
                      />
                    ) : isHalf ? (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: "50%" }}
                      >
                        <Star fill="#F3B81F" stroke="#F3B81F" size={16} />
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-[13px] text-gray-600">
          {rating.toFixed(1)} / 5 ({reviewCount} review
          {reviewCount !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Short Description */}
      {data?.description && (
        <p className="text-sm text-gray-500 leading-relaxed">
          {data?.description}
        </p>
      )}
    </div>
  );
};

export default ProductHeader;
