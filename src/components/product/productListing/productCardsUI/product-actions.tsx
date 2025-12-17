import React, { useMemo } from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";
import { useCart } from "@/hooks/use-cart";
import { useBuyNow } from "@/hooks/use-buy-now";
import { useUI } from "@/hooks/use-UI";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";

const AddToCart = React.lazy(() => import("@/components/product/add-to-cart"));

interface ProductActionsProps {
  product: Product;
  variant?: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  variant = "mercury",
}) => {
  const { id, product_type, slug, quantity } = product;
  const { useCartHelpers } = useCart();
  const { outOfStock } = useCartHelpers();
  const statusOutOfStock = outOfStock(id);
  const { useBuyNowActions } = useBuyNow();
  const { buyNow, buyNowLoader } = useBuyNowActions(product);
  const { isAuthorized } = useUI();
  const { openModal } = useModal();

  const btnVariant = useMemo(() => {
    if (variant === "furni") return "btnFurni-detail";
    return "button-detail";
  }, [variant]);

  const handleBuyNow = () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to buy now");
      return;
    }
    if (product_type === "variable") {
      // For variable products, redirect to product page to select variant
      window.location.href = `${ROUTES.PRODUCT}/${slug}`;
      return;
    }
    buyNow();
  };
  return (
    <div className="product-cart-button flex flex-col justify-center gap-2">
      {statusOutOfStock || quantity < 1 ? null : product_type === "variable" ? (
        <Link variant={btnVariant} href={`${ROUTES.PRODUCT}/${slug}`}>
          Choose Options
        </Link>
      ) : (
        <>
          <AddToCart data={product} />
          <button
            className="w-full px-3 py-1.5 flex relative leading-5 font-medium text-brand-dark rounded-full text-xs items-center justify-center transition-all bg-white hover:bg-gray-50 border border-border-base shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Buy Now Button"
            onClick={handleBuyNow}
            disabled={statusOutOfStock || quantity < 1 || buyNowLoader}
          >
            {buyNowLoader ? "Loading..." : "Buy Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default ProductActions;
