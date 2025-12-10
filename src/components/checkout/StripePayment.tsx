"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/services/order/order-api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

interface CustomCardFormProps {
  addressId: string;
  metadata?: object;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#6b6b6b",
      "::placeholder": { color: "#6b6b6b" },
    },
    invalid: { color: "#fa755a" },
  },
};

const CustomCardForm: React.FC<CustomCardFormProps> = ({
  addressId,
  metadata,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState("");
  const { mutateAsync: createOrder } = useCreateOrderMutation();
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!cardName.trim()) {
      toast.error("Please enter the cardholder name");
      return;
    }

    setLoading(true);
    try {
      const { order, clientSecret } = await createOrder({
        addressId,
        paymentMethod: "stripe",
        metadata,
      });

      if (!clientSecret) throw new Error("Payment intent missing");

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: { name: cardName },
          },
        }
      );

      if (error) throw error;

      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        router.push(ROUTES.ORDER_CONFIRMATION(order._id));
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6 text-brand-white">
      <div>
        <label className="block text-sm font-medium mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter cardholder name"
          className="w-full border rounded-md p-3 bg-transparent text-brand-white placeholder-brand-muted"
        />
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <div className="border rounded-md p-3 text-brand-white">
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Expiration + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry</label>
          <div className="border rounded-md p-3 text-brand-white">
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <div className="border rounded-md p-3 text-brand-white">
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading || !stripe} className="w-fit">
        {loading ? "Processing..." : `Pay`}
      </Button>
    </form>
  );
};

const StripeCustomWrapper: React.FC<CustomCardFormProps> = (props) => {
  if (!stripePromise) return <p>Stripe not configured. Check your keys.</p>;
  return (
    <Elements stripe={stripePromise}>
      <CustomCardForm {...props} />
    </Elements>
  );
};

export default StripeCustomWrapper;
