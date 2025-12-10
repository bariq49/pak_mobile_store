"use client";

import cn from "classnames";
import Link from "@/components/shared/link";
import useWindowSize from "@/utils/use-window-size";

interface BannerProps {
  banner?: any;
}

function getImage(deviceWidth: number, imgObj: any) {
  if (!imgObj) {
    return { url: "/assets/images/hero/home1/slider-1.jpg" };
  }

  const mobile = imgObj?.mobile?.url;
  const desktop = imgObj?.desktop?.url;

  if (deviceWidth < 480 && mobile) return { url: mobile };
  if (desktop) return { url: desktop };

  // fallback if neither exists
  return { url: "/assets/images/hero/home1/slider-1.jpg" };
}

export default function HeroSliderCard({ banner }: BannerProps) {
  const { width } = useWindowSize();
  const { title, description, image, btnText, btnUrl, products } = banner || {};
  const selectedImage = getImage(width || 1024, image);
  const productSlug = products?.[0]?.slug;
  const finalUrl = btnUrl || (productSlug ? `/product/${productSlug}` : "#");

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl min-h-[380px] md:min-h-[480px] lg:min-h-[550px] flex items-center"
      style={{
        backgroundImage: `url('${selectedImage.url}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 max-w-[700px] text-left text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 drop-shadow-md">
          {title || "Exclusive Deal"}
        </h2>

        {description && (
          <p className="text-base sm:text-lg text-gray-100 leading-relaxed mb-6">
            {description}
          </p>
        )}

        {/* CTA */}
        {(btnText || productSlug) && (
          <Link
            href={finalUrl}
            className={cn(
              "inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-primary-400 hover:bg-primary-500 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
            )}
          >
            {btnText || "Shop Now"}
          </Link>
        )}
      </div>
    </div>
  );
}
