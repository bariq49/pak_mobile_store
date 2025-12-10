import React from "react";
import { Product, VariationOption } from "@/services/types";
import Button from "@/components/shared/button";
import CartIcon from "@/components/icons/cart-icon";
import WishlistButton from "@/components/wishlist/wishlist-button";
import CompareButton from "@/components/compare/compare-button";
import PaypalIconLabel from "@/components/icons/payment/paypal-text";
import { useUI } from "@/hooks/use-UI";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface ProductActionsProps {
  data: Product;
  selectedVariation?: VariationOption;
  addToCart: () => void;
  addToCartLoader: boolean;
  isSelected: boolean;
  targetButtonRef: React.RefObject<HTMLButtonElement | null>;
  isInCart: (id: string) => boolean;
  isInStock: (id: string) => boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  data,
  addToCart,
  addToCartLoader,
  selectedVariation,
  isSelected,
  isInCart,
  isInStock,
  targetButtonRef,
}) => {
  const itemId = (selectedVariation?.id ?? data._id ?? "").toString();
  const outOfStock = isInCart(itemId) && !isInStock(itemId);

  const { isAuthorized } = useUI();
  const { openModal } = useModal();

  const handleAddToCart = () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart();
  };

  return (
    <div className="space-y-2.5 md:space-y-3.5">
      <div className="flex flex-col md:flex-row gap-2.5 mt-8">
        <Button
          ref={targetButtonRef}
          variant="dark"
          onClick={handleAddToCart}
          className="flex-auto px-1.5 relative"
          disabled={!isSelected || outOfStock || addToCartLoader}
        >
          {addToCartLoader ? (
            <Loader className="w-5 h-5 animate-spin text-white" />
          ) : (
            <>
              <CartIcon width={18} className="text-white ltr:mr-3 rtl:ml-3" />
              {outOfStock ? "Out Of Stock" : "Add To Cart"}
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-2.5 lg:w-[140px]">
          <WishlistButton product={data} />
          <CompareButton product={data} />
        </div>
      </div>

      {/* <Button variant="paypal" className="gap-2">
        Pay with <PaypalIconLabel />
      </Button> */}
    </div>
  );
};

export default ProductActions;
