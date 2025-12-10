import React from "react";
import { Product } from "@/services/types";
import { X } from "lucide-react";

interface ProductActionsProps {
  product: Product;
  removeWishlist?: (id: string) => void;
}

const BtnRemoveWishlist: React.FC<ProductActionsProps> = ({
  product,
  removeWishlist,
}) => {
  const { id } = product;

  return (
    <>
      {removeWishlist && (
        <button
          onClick={() => removeWishlist(String(id))}
          className="bg-primary-500 hover:bg-gray-200 px-1 py-1 rounded-full absolute right-0 top-0 m-3 z-10 cursor-pointer"
        >
          <X size={20} strokeWidth={2} />
          <span className="sr-only">Remove from Wishlist</span>
        </button>
      )}
    </>
  );
};

export default BtnRemoveWishlist;
