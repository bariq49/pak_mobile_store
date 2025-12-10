import React, { useState } from "react";
import cn from "classnames";
import { useCompare } from "@/hooks/use-compare";
import { Tooltip } from "@/components/shared/tooltip";
import { Check, GitCompare, Loader } from "lucide-react";
import { useUI } from "@/hooks/use-UI";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

interface Props {
  product: any;
  className?: string;
}

const CompareButton: React.FC<Props> = ({ product, className }) => {
  const { compareList, addToCompare } = useCompare();
  const { openDrawer, setDrawerView, isAuthorized } = useUI();
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();
  const InCompare = (productId: number) =>
    compareList.some((product) => product.id === productId);

  const isInCompare = InCompare(product?.id);
  const compareStatus = isInCompare ? "Browse compares" : "Add to Compare";

  const handleCompare = async () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to use compare");
      return;
    }

    if (isInCompare) {
      setDrawerView("COMPARE_SIDEBAR");
      openDrawer();
      return;
    }

    try {
      setLoading(true);
      await addToCompare(product);
      toast.success("Product added to compare");
      setDrawerView("COMPARE_SIDEBAR");
      openDrawer();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip content={compareStatus} className="min-w-36">
      <button
        onClick={handleCompare}
        disabled={loading}
        className={cn(
          "bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3 rounded w-full flex justify-center h-full hover:text-white hover:bg-primary-400 transition-colors",
          className,
          { "bg-primary-400 text-white": isInCompare }
        )}
      >
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : isInCompare ? (
          <Check size={20} strokeWidth={2} />
        ) : (
          <GitCompare size={20} strokeWidth={1} />
        )}
      </button>
    </Tooltip>
  );
};

export default CompareButton;
