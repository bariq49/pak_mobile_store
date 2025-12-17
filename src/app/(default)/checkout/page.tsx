"use client";

import { useEffect, useState } from "react";
import CheckoutCard from "@/components/checkout/checkout-card";
import Container from "@/components/shared/container";
import CheckoutDetails from "@/components/checkout/checkout-details";
import Breadcrumb from "@/components/shared/breadcrumb";
import { useBuyNowQuery } from "@/services/cart/buy-now-api";
import { useRouter } from "next/navigation";
import { useClearBuyNow } from "@/services/cart/buy-now-api";

export default function CheckoutPage() {
  const [isBuyNow, setIsBuyNow] = useState(false);
  const { data: buyNowData, isLoading: isLoadingBuyNow } = useBuyNowQuery();
  const { mutate: clearBuyNow } = useClearBuyNow();
  const router = useRouter();

  useEffect(() => {
    // Check localStorage flag first (set when user clicks Buy Now)
    if (typeof window !== "undefined") {
      const buyNowFlag = localStorage.getItem("isBuyNow");
      if (buyNowFlag === "true") {
        setIsBuyNow(true);
      }
    }

    // After API data loads, verify if buy-now item exists
    if (!isLoadingBuyNow) {
      if (buyNowData && buyNowData.items && buyNowData.items.length > 0) {
        // Buy-now item exists, confirm isBuyNow is true
        setIsBuyNow(true);
        // Clear the flag after confirming data exists
        if (typeof window !== "undefined") {
          localStorage.removeItem("isBuyNow");
        }
      } else if (buyNowData === null || (buyNowData.items && buyNowData.items.length === 0)) {
        // No buy-now data from API
        // Check if we still have the flag (might be a timing issue)
        if (typeof window !== "undefined") {
          const buyNowFlag = localStorage.getItem("isBuyNow");
          if (buyNowFlag === "true") {
            // Flag exists but no API data yet - keep waiting or set to false
            // For now, keep it true if flag exists (might be loading)
            setIsBuyNow(true);
          } else {
            // No flag and no data - definitely not buy-now
            setIsBuyNow(false);
          }
        } else {
          setIsBuyNow(false);
        }
      }
    }
  }, [buyNowData, isLoadingBuyNow]);

  // Cleanup: Clear buy-now when user navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isBuyNow && typeof window !== "undefined") {
        // Clear buy-now flag on page unload
        localStorage.removeItem("isBuyNow");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isBuyNow]);

  return (
    <Container className="py-8 md:py-10 checkout">
      <Breadcrumb />
      <div className="pt-6 lg:pt-8 px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 xl:gap-10 max-w-[1400px] mx-auto">
          <div className="w-full p-2">
            <CheckoutDetails isBuyNow={isBuyNow} />
          </div>
          <div className="w-full xl:sticky xl:top-8 xl:self-start">
            <CheckoutCard isBuyNow={isBuyNow} />
          </div>
        </div>
      </div>
    </Container>
  );
}
