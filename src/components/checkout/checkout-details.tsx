"use client";

import { useState } from "react";
import ShippingAddress from "./shipping-address";
import PaymentMethodSelector from "./paymentm-method-selector";
import { useCartStore } from "@/stores/useCartStore";
import { useBuyNowStore } from "@/stores/useBuyNowStore";

type CheckoutStep = "shipping" | "payment";

interface CheckoutDetailsProps {
  isBuyNow?: boolean;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  isBuyNow = false,
}) => {
  const [activeStep, setActiveStep] = useState<CheckoutStep>("shipping");
  const [formData, setFormData] = useState<any>({
    shipping: null,
    payment: null,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const cartStore = useCartStore();
  const buyNowStore = useBuyNowStore();
  const { paymentMethod } = isBuyNow ? buyNowStore : cartStore;

  const handleShippingComplete = (data: any) => {
    setFormData((prev: any) => ({ ...prev, shipping: data }));
    setActiveStep("payment");
  };

  const steps = [
    {
      id: 1,
      title: "Shipping Address",
      sub: "Where should we deliver your order?",
      component: <ShippingAddress onComplete={handleShippingComplete} />,
      key: "shipping" as CheckoutStep,
    },
    {
      id: 2,
      title: "Payment Method",
      sub: "Choose your payment method",
      component: (
        <PaymentMethodSelector
          addressId={formData.shipping?._id}
          metadata={{ note: "checkout metadata" }}
          isBuyNow={isBuyNow}
        />
      ),
      key: "payment" as CheckoutStep,
    },
  ];

  return (
    <div className="overflow-hidden space-y-8 p-3">
      {steps.map((step) => (
        <div key={step.id} className="bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-brand-dark mb-1">
              {step.title}
            </h2>
            <p className="text-sm text-gray-500">
              {step.sub}
            </p>
          </div>

          {/* Show component if it's the active step, or if it's payment (always show payment section) */}
          {(activeStep === step.key || step.key === "payment") && (
            <div className="pb-0">
              {step.component}
            </div>
          )}

          {/* Show summary if step is completed and not active */}
          {formData[step.key] && activeStep !== step.key && step.key === "shipping" && (
            <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-brand-dark">{step.title}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">
                    {formData.shipping?.fullName || "Address selected"}
                  </span>
                </div>
                <button
                  onClick={() => setActiveStep(step.key)}
                  className="text-sm text-primary-500 hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Terms & Conditions and Checkout Button - Only show when payment step is active */}
      {activeStep === "payment" && formData.shipping && (
        <div className="mt-6 space-y-4 p-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label
              htmlFor="terms-checkbox"
              className="text-sm text-brand-dark cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="/terms"
                className="text-primary-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          {!agreedToTerms && (
            <p className="text-sm text-red-500 mt-1">
              Please agree to the terms and conditions to proceed with the checkout.
            </p>
          )}

          <button
            type="button"
            disabled={!agreedToTerms || !paymentMethod}
            className={`w-full py-3 px-6 rounded-md font-medium text-base transition-all ${
              agreedToTerms && paymentMethod
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Check out
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutDetails;
