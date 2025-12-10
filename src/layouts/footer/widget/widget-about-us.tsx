"use client";

import Link from "next/link";
import Image from "@/components/shared/image";
import cn from "classnames";
import Logo from "@/components/shared/logo";
import { ROUTES } from "@/utils/routes";

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  return (
    <div className={cn("pb-10 sm:pb-0 text-brand-light/80", className)}>
      <div className="text-sm xl:max-w-[350px] mx-auto sm:ms-0 mb-3">
        <Logo
          href={ROUTES.HOME}
          variant={"dark"}
          className="mb-3 lg:mb-6 mx-auto sm:ms-0"
        />

        <div className="mb-3">
          Address: Acme Widgets 123 Widget Street Acmeville, AC 12345 United
          States of America
        </div>
        <div className="mt-4">Phone: (1800)-000-6890</div>
        <div className="mb-2">Email: sales@emberidge.com</div>
      </div>

      {social && (
        <ul className="flex flex-wrap items-center space-x-4 md:space-s-5 mt-5">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : "#"}>
                <Image
                  src={item.image}
                  alt={item.name}
                  height={item.height}
                  width={item.width}
                  className="transform text-brand-light"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
