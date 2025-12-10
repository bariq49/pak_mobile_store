"use client";

import { useCart } from "@/hooks/use-cart";
import { constructCartItem } from "@/utils/construct-cart-item";
import cn from "classnames";
import { Product, VariationOption } from "@/services/types";
import { useUI } from "@/hooks/use-UI";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface Props {
  data: Product;
  variation?: VariationOption;
  disabled?: boolean;
  className?: string;
}

const AddToCart = ({ data, variation, disabled, className }: Props) => {
  const { useCartActions, useCartHelpers } = useCart();
  const { isInStock, isInCart } = useCartHelpers();
  const { addToCart, addToCartLoader } = useCartActions(data, variation);

  const { isAuthorized } = useUI();
  const { openModal } = useModal();

  const item = constructCartItem(data!, variation!);
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);

  const handleAddToCart = () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart();
  };

  return (
    <button
      className={cn(
        "min-w-[150px] px-4 py-2 flex relative leading-6 font-medium text-brand-light rounded-full text-[13px] items-center justify-center transition-all bg-primary-500 hover:bg-primary-400",
        className,
        {
          "sm:text-white/30": addToCartLoader,
        }
      )}
      aria-label="Add to Cart Button"
      onClick={handleAddToCart}
      disabled={disabled || outOfStock}
    >
      {outOfStock ? "Out Of Stock" : "Add To Cart"}
      {addToCartLoader && (
        <Loader className="w-4 h-4 animate-spin absolute text-white" />
      )}
    </button>
  );
};

export default AddToCart;
