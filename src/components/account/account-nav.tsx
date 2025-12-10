"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/shared/link";
import cn from "classnames";

type Option = {
  name: string;
  slug: string;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row  border-b  border-border-base bg-white space-x-4 md:space-x-8">
      {options.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.slug}
            className={cn(
              "relative flex items-center cursor-pointer text-sm lg:text-base py-3.5 hover:text-primary-500 px-2",
              pathname !== item.slug
                ? "font-medium"
                : "text-primary-500 font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-primary-500 after:rounded-full"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
