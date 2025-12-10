"use client";

import { CreditCard, HandCoins, Check, Loader2, Loader } from "lucide-react";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/services/order/order-api";
import { useSetPaymentMethod } from "@/services/cart/cart-api";
import { useCartStore } from "@/stores/useCartStore";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";
import StripeCustomWrapper from "./StripePayment";

interface PaymentMethodSelectorProps {
  addressId: string;
  metadata?: object;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  addressId,
  metadata,
}) => {
  const router = useRouter();
  const { paymentMethod, setPaymentMethod: storeSetPaymentMethod } =
    useCartStore();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrderMutation();
  const { mutate: setPaymentMethod, isPending: settingPayment } =
    useSetPaymentMethod();
  const handleSelectMethod = (selected: "stripe" | "cod") => {
    storeSetPaymentMethod(selected);
    setPaymentMethod(selected, {
      onSettled: () => {},
    });
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
      });

      toast.success("Order placed successfully (Cash on Delivery)");
      router.push(ROUTES.ORDER_CONFIRMATION(order._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stripe Option */}
        <button
          type="button"
          onClick={() => handleSelectMethod("stripe")}
          disabled={settingPayment}
          className={`relative border rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 ${
            paymentMethod === "stripe"
              ? "border-primary-500 ring-2 ring-primary-500/30 bg-primary-500/5"
              : "border-border hover:border-primary-500/40 bg-white"
          }`}
        >
          {paymentMethod === "stripe" && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow">
              {settingPayment ? (
                <Loader2 className="w-3 h-3 text-white animate-spin" />
              ) : (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
          )}
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              paymentMethod === "stripe"
                ? "bg-primary-500 text-brand-light"
                : "bg-background text-brand-muted"
            }`}
          >
            <CreditCard size={20} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-lg font-semibold mb-1">Pay with Card</h4>
            <p className="text-sm text-brand-muted">
              Secure and instant online payment via Stripe.
            </p>
          </div>
        </button>

        {/* COD Option */}
        <button
          type="button"
          onClick={() => handleSelectMethod("cod")}
          disabled={settingPayment}
          className={`relative border rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 ${
            paymentMethod === "cod"
              ? "border-primary-500 ring-2 ring-primary-500/30 bg-primary-500/5"
              : "border-border hover:border-primary-500/40 bg-white"
          }`}
        >
          {paymentMethod === "cod" && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow">
              {isCreatingOrder ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
          )}
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              paymentMethod === "cod"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <HandCoins size={20} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-lg font-semibold mb-1">Cash on Delivery</h4>
            <p className="text-sm text-gray-500">
              Pay with cash when your order is delivered.
            </p>
          </div>
        </button>
      </div>

      {/* Render selected method */}
      {paymentMethod === "stripe" && (
        <div className="mt-6 border rounded-xl p-5 bg-white shadow-sm">
          <StripeCustomWrapper addressId={addressId} metadata={metadata} />
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="mt-6 space-y-4 bg-white border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 leading-relaxed">
            Pay with cash when your order arrives. This method allows you to pay
            directly to the delivery partner upon receiving your package. Please
            ensure you have the exact amount ready, as delivery agents may not
            carry change. Orders may be verified before dispatch for security
            purposes.
          </p>

          <Button
            onClick={handleCODOrder}
            disabled={settingPayment || isCreatingOrder}
            variant="primary"
            className="w-fit flex items-center gap-2"
          >
            {isCreatingOrder ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm COD Order"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
