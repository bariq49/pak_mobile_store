import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { Star } from "lucide-react";
import { ROUTES } from "@/utils/routes";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { name, slug } = product;

  // Safely extract rating values with proper fallbacks
  const rating =
    typeof product.ratingsAverage === "number" ? product.ratingsAverage : 0;
  const reviewCount =
    typeof product.ratingsQuantity === "number" ? product.ratingsQuantity : 0;

  return (
    <>
      <Link
        href={`${ROUTES.PRODUCT}/${slug}`}
        className="text-brand-dark text-sm leading-5 line-clamp-2 mt-1 mb-2 hover:text-brand-muted"
      >
        {name}
      </Link>
      <div className="flex text-brand-muted space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => {
            const starValue = idx + 1;
            const isFull = starValue <= rating;
            const isHalf = !isFull && starValue - 0.5 <= rating;
            return (
              <div key={idx} className="relative inline-block mx-px">
                <Star
                  stroke="var(--color-brand-muted)"
                  fill="white"
                  size={12}
                />
                {rating > 0 && (
                  <>
                    {isFull ? (
                      <Star
                        fill="#F3B81F"
                        stroke="#F3B81F"
                        size={12}
                        className="absolute inset-0"
                      />
                    ) : isHalf ? (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: "50%" }}
                      >
                        <Star fill="#F3B81F" stroke="#F3B81F" size={12} />
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-[13px] leading-4">
          ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
        </span>
      </div>
    </>
  );
};

export default ProductDetails;
