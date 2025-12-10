import cn from "classnames";
import { Product } from "@/services/types";
import ProgressCard from "@/components/shared/progress-card";
import ProductCountdownTimer from "@/components/shared/productCountdownTimer";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import React from "react";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import { useCart } from "@/hooks/use-cart";

interface ProductProps {
  product: Product;
  className?: string;
  date?: string | number | Date;
  variant?: string;
}

const ProductSaleCard: React.FC<ProductProps> = ({ product, className }) => {
  const { id, name, sold, quantity, sale_end } = product;
  const { useCartHelpers } = useCart();
  const { outOfStock } = useCartHelpers();
  const statusOutOfStock = outOfStock(id);

  return (
    <article
      className={cn("grid grid-cols-7 gap-3 relative product-card", className)}
      title={name}
    >
      <div className="relative col-span-12 sm:col-span-3 flex-shrink-0">
        <ProductImage product={product} outOfStock={statusOutOfStock} />
      </div>

      <div className="col-span-12 sm:col-span-4 flex flex-col pb-5 lg:pb-6 lg:pt-3">
        <ProductDetails product={product} />

        <ProductPricing product={product} />

        <h2 className="text-gray-500 text-sm mb-2">Hurry Up! Offer ends in</h2>
        <ProductCountdownTimer
          date={new Date(sale_end as string | number | Date)}
        />
        <ProgressCard
          soldProduct={sold}
          totalProduct={quantity}
          className="pt-4 lg:pt-6"
        />
      </div>
    </article>
  );
};

export default ProductSaleCard;
