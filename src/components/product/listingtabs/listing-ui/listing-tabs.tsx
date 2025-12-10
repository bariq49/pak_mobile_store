"use client";
import cn from "classnames";
import { ROUTES } from "@/utils/routes";
import useWindowSize from "@/utils/use-window-size";
import { useMemo } from "react";

import Link from "@/components/shared/link";
import DesktopTabs from "@/components/product/listingtabs/listing-ui/desktopTabs";
import MobileDropdownTabs from "@/components/product/listingtabs/listing-ui/mobileDropdownTabs";

const ListingTabs = ({ className, data, onNavClick, activeTab }: any) => {
  const { width } = useWindowSize();
  const isDesktopView = useMemo(() => width! > 1280, [width]);

  return (
    <div
      className={cn(
        "sm:flex items-center px-5 py-2.5 block-title mb-1.5 gap-2",
        className
      )}
    >
      <h3 className="text-xl text-brand-dark font-medium xl:basis-[30%]">
        <Link href={`${ROUTES.CATEGORY}/${data?.slug}`}>{data?.name}</Link>
      </h3>

      {Array.isArray(data?.children) &&
        (isDesktopView ? (
          <DesktopTabs
            childrenData={data.children}
            activeTab={activeTab}
            onNavClick={(slug: string) => onNavClick(slug)}
          />
        ) : (
          <MobileDropdownTabs
            childrenData={data.children}
            activeTab={activeTab}
            onNavClick={(slug: string) => onNavClick(slug)}
          />
        ))}
    </div>
  );
};

export default ListingTabs;
