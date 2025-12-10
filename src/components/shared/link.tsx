"use client";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import cn from "classnames";

const Link: React.FC<
  NextLinkProps & {
    className?: string;
    children?: React.ReactNode;
    variant?:
      | "base"
      | "line"
      | "button-border"
      | "button-primary"
      | "button-black"
      | "button-white"
      | "button-detail"
      | "btnFurni-detail"
      | "button-small-border"
      | "button-small-primary";
    title?: string;
  }
> = ({ children, className, title, variant = "line", ...props }) => {
  const btnClassName =
    "rounded block uppercase font-medium px-5 py-4 md:py-3.5 lg:py-4 text-sm lg:text-15px leading-4 cursor-pointer transition-all ease-in-out duration-300 text-center";
  const btnSmallClassName =
    "rounded block uppercase font-medium px-4 py-2.5 text-xs leading-3 cursor-pointer transition-all ease-in-out duration-300 text-center";

  const rootClassName = cn(
    "group",
    {
      ["text-primary-500"]: variant === "base",
      [`transition-all ease-in-out duration-500 hover:text-brand-light/80`]:
        variant === "line",
      [`text-black font-medium border border-gray-400 ${btnClassName} hover:border-primary-500 hover:text-primary-500`]:
        variant === "button-border",
      [`bg-brand-dark dark:bg-brand-light text-white ${btnClassName} hover:bg-brand-dark/90`]:
        variant === "button-black",
      [`bg-white text-brand-dark ${btnClassName} hover:bg-primary-400 hover:text-white`]:
        variant === "button-white",
      [`text-brand-light ${btnClassName} bg-primary-500 hover:bg-primary-400`]:
        variant === "button-primary",
      [`inline-block text-center flex px-4 py-2 relative leading-6 text-brand-light font-medium rounded-full text-[13px] transition-all bg-primary-500 hover:bg-primary-400`]:
        variant === "button-detail",
      [`w-full xs:rounded-none text-center min-w-[150px] flex px-4 py-2 relative leading-6 text-brand-light font-medium rounded text-[13px] items-center justify-center transition-all bg-primary-500 hover:bg-primary-400`]:
        variant === "btnFurni-detail",
      // New small button variants
      [`text-black font-medium border border-gray-400 ${btnSmallClassName} hover:border-primary-500 hover:text-primary-500`]:
        variant === "button-small-border",
      [`text-white ${btnSmallClassName} bg-primary-500 hover:bg-primary-400`]:
        variant === "button-small-primary",
    },
    className
  );

  return (
    <NextLink {...props} title={title} className={rootClassName}>
      {children}
    </NextLink>
  );
};

export default Link;
