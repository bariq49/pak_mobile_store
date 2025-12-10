import cn from "classnames";
import { Heart, Trash2, Loader } from "lucide-react";
import { Tooltip } from "@/components/shared/tooltip";
import { useModal } from "@/hooks/use-modal";
import { useUI } from "@/hooks/use-UI";
import { useWishlist } from "@/hooks/use-wishlist";
import toast from "react-hot-toast";

interface Props {
  product: any;
  className?: string;
}

const WishlistButton: React.FC<Props> = ({ product, className }) => {
  const { isAuthorized } = useUI();
  const { openModal } = useModal();
  const {
    wishlistList,
    addToWishlist,
    removeFromWishlist,
    addToWishlistMutation,
    removeFromWishlistMutation,
  } = useWishlist();

  const isWishlist = wishlistList.some(
    (item: any) => item.product?.id === product.id || item.id === product.id
  );
  const wishlistStatus = isWishlist
    ? "Remove from Wishlist"
    : "Add to Wishlist";

  const isLoading =
    addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

  const handleWishlist = () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to add items to wishlist");
      return;
    }

    if (isWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Tooltip content={wishlistStatus} className="min-w-36">
      <button
        onClick={handleWishlist}
        disabled={isLoading}
        className={cn(
          "bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3 w-full flex justify-center items-center rounded-md h-full hover:text-white hover:bg-primary-400 transition-colors duration-200",
          className,
          { "bg-primary-400 text-white": isWishlist, "opacity-70": isLoading }
        )}
        aria-label={wishlistStatus}
      >
        {isLoading ? (
          <Loader size={20} className="animate-spin" />
        ) : isWishlist ? (
          <Trash2 size={20} strokeWidth={2} />
        ) : (
          <Heart size={20} strokeWidth={1} />
        )}
      </button>
    </Tooltip>
  );
};

export default WishlistButton;
