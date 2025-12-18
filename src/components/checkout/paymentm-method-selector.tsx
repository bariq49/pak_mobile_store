"use client";

import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/services/order/order-api";
import { useSetPaymentMethod } from "@/services/cart/cart-api";
import { useSetBuyNowPaymentMethod, useClearBuyNow } from "@/services/cart/buy-now-api";
import { useCartStore } from "@/stores/useCartStore";
import { useBuyNowStore } from "@/stores/useBuyNowStore";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";
import StripeCustomWrapper from "./StripePayment";

interface PaymentMethodSelectorProps {
  addressId: string;
  metadata?: object;
  isBuyNow?: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  addressId,
  metadata,
  isBuyNow = false,
}) => {
  const router = useRouter();
  const cartStore = useCartStore();
  const buyNowStore = useBuyNowStore();
  
  // Use buy-now store if isBuyNow is true, otherwise use cart store
  const { paymentMethod, setPaymentMethod: storeSetPaymentMethod } = isBuyNow
    ? buyNowStore
    : cartStore;

  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrderMutation();
  const { mutate: setCartPaymentMethod, isPending: settingCartPayment } =
    useSetPaymentMethod();
  const { mutate: setBuyNowPaymentMethod, isPending: settingBuyNowPayment } =
    useSetBuyNowPaymentMethod();
  const { mutate: clearBuyNow } = useClearBuyNow();

  const settingPayment = isBuyNow ? settingBuyNowPayment : settingCartPayment;

  const handleSelectMethod = (selected: "stripe" | "cod") => {
    storeSetPaymentMethod(selected);
    if (isBuyNow) {
      setBuyNowPaymentMethod(selected, {
        onSettled: () => {},
      });
    } else {
      setCartPaymentMethod(selected, {
        onSettled: () => {},
      });
    }
  };

  // Handle COD order
  const handleCODOrder = async () => {
    if (!addressId) {
      toast.error("Please select a shipping address first");
      return;
    }

    try {
      const { order } = await createOrder({
        addressId,
        paymentMethod: "cod",
        metadata,
        isBuyNow: isBuyNow,
      });

      // Clear buy-now if this was a buy-now order
      if (isBuyNow) {
        clearBuyNow();
        if (typeof window !== "undefined") {
          localStorage.removeItem("isBuyNow");
        }
      }

      toast.success("✓ Order placed successfully (Cash on Delivery). It may take 5 to 10 minutes to receive the confirmation email.");
      router.push(ROUTES.ORDER_CONFIRMATION(order._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    }
  };

  return (
    <div className="space-y-4">
      {/* Payment Options */}
      <div className="space-y-3">
        {/* Stripe Option */}
        <button
          type="button"
          onClick={() => handleSelectMethod("stripe")}
          disabled={settingPayment}
          className={`relative border rounded p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 w-full ${
            paymentMethod === "stripe"
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            paymentMethod === "stripe"
              ? "border-black bg-black"
              : "border-gray-300"
          }`}>
            {paymentMethod === "stripe" && (
              <Check className="w-2.5 h-2.5 text-white" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-base font-medium mb-1 text-brand-dark">Pay with Card</h4>
            <p className="text-sm text-gray-500">
              Secure and instant online payment via Stripe.
            </p>
          </div>
        </button>

        {/* COD Option */}
        <button
          type="button"
          onClick={() => handleSelectMethod("cod")}
          disabled={settingPayment}
          className={`relative border rounded p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 w-full ${
            paymentMethod === "cod"
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            paymentMethod === "cod"
              ? "border-black bg-black"
              : "border-gray-300"
          }`}>
            {paymentMethod === "cod" && (
              <Check className="w-2.5 h-2.5 text-white" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-base font-medium mb-1 text-brand-dark">Cash on Delivery</h4>
            <p className="text-sm text-gray-500">
              Pay with cash when your order is delivered.
            </p>
          </div>
        </button>
      </div>

      {/* Render selected method */}
      {paymentMethod === "stripe" && (
        <div className="mt-4 border border-gray-200 rounded p-5 bg-white">
          <StripeCustomWrapper
            addressId={addressId}
            metadata={metadata}
            isBuyNow={isBuyNow}
          />
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="mt-4 space-y-4 bg-white border border-gray-200 rounded p-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            Pay with cash when your order arrives. This method allows you to pay
            directly to the delivery partner upon receiving your package. Please
            ensure you have the exact amount ready, as delivery agents may not
            carry change. Orders may be verified before dispatch for security
            purposes.
          </p>

          <button
            onClick={handleCODOrder}
            disabled={settingPayment || isCreatingOrder}
            className={`px-6 py-3 rounded-md font-medium text-base transition-all flex items-center gap-2 ${
              settingPayment || isCreatingOrder
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
          >
            {isCreatingOrder ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm COD Order"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
