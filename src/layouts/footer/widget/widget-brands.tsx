"use client";
import Heading from "@/components/shared/heading";
import Link from "@/components/shared/link";
import cn from "classnames";
import { useBrands } from "@/services/brand/get-brands";
import { ROUTES } from "@/utils/routes";
import Loading from "@/components/shared/loading";

interface Props {
  className?: string;
}

const WidgetBrands: React.FC<Props> = ({ className }) => {
  const { data: brands, isLoading } = useBrands();

  // Limit to first 6-8 brands for footer display
  const displayBrands = brands?.slice(0, 8) || [];

  if (isLoading) {
    return (
      <div className={cn("text-fill-footer", className)}>
        <Heading
          variant="mediumHeading"
          className={cn("text-brand-light mb-4 lg:mb-5")}
        >
          Brands
        </Heading>
        <Loading />
      </div>
    );
  }

  if (!displayBrands || displayBrands.length === 0) {
    return null;
  }

  return (
    <div className={cn("text-fill-footer", className)}>
      <Heading
        variant="mediumHeading"
        className={cn("text-brand-light mb-4 lg:mb-5")}
      >
        Brands
      </Heading>
      <ul className="text-sm lg:text-14px flex flex-col space-y-1">
        {displayBrands.map((brand) => (
          <li key={`footer-brand-${brand.slug}`}>
            <Link
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className={cn(
                "leading-7 transition-colors duration-200 block text-brand-light/80 hover:text-brand-muted"
              )}
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetBrands;

