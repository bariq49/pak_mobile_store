"use client";
import Link from "@/components/shared/link";
import cn from "classnames";
import { siteSettings } from "@/data/site-settings";
import React from "react";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/utils/use-is-mounted";
import Image from "next/image";

interface Props {
  variant?: "white" | "dark";
  className?: string;
  href?: string;
}

const Logo: React.FC<Props> = ({
  className,
  variant,
  href = siteSettings.logo.href,
  ...props
}) => {
  const { theme } = useTheme();
  const mounted = useIsMounted();

  return (
    <Link
      href={href}
      className={cn("inline-flex focus:outline-none ", className)}
      {...props}
    >
      {variant === "dark" || (theme && theme === "dark") ? (
        <Image
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt}
          width={siteSettings.logo.width}
          height={siteSettings.logo.height}
          priority // Add priority to optimize LCP
        />
      ) : (
        <Image
          src={siteSettings.logoBlack.url}
          alt={siteSettings.logoBlack.alt}
          width={siteSettings.logoBlack.width}
          height={siteSettings.logoBlack.height}
          priority // Add priority to optimize LCP
        />
      )}
    </Link>
  );
};

export default Logo;
