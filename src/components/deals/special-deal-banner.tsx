import React from "react";
import Image from "@/components/shared/image";
import Link from "@/components/shared/link";
import { NormalizedDeal } from "@/hooks/use-deals";

interface SpecialDealBannerProps {
  deal: NormalizedDeal;
}

const SpecialDealBanner: React.FC<SpecialDealBannerProps> = ({ deal }) => {
  const imageSrc = deal.imageDesktop || deal.imageMobile || "";

  const href = {
    pathname: deal.ctaUrl || "/deals",
    query: {
      dealId: deal._id,
      variant: deal.dealVariant,
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-100 group h-full">
      <Image
        src={imageSrc}
        alt={deal.title}
        width={600}
        height={200}
        rootClassName="h-full w-full"
        className="transition-opacity duration-300 group-hover:opacity-80 object-center h-full object-cover"
        loading="lazy"
        priority={false}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Link
          href={href}
          variant="button-white"
          className="pointer-events-auto px-5 py-2 text-sm font-medium opacity-0 translate-y-1 transition-all duration-200 focus-visible:opacity-100 focus-visible:translate-y-0 group-hover:opacity-100 group-hover:translate-y-0"
        >
          {deal.ctaText || "Shop Now"}
        </Link>
      </div>
    </div>
  );
};

export default SpecialDealBanner;


