"use client"; // ✅ Ensures this runs only on the client
import Image from "@/components/shared/image";
import { siteSettings } from "@/data/site-settings";
import Container from "@/components/shared/container";
import cn from "classnames";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  return (
    <div className="pt-5 pb-16 sm:pb-20 md:pb-20 lg:pb-3 mb-2 sm:mb-0 text-brand-light border-t xs:border-border-base border-border-base/70">
      <Container variant="Large">
        <div className="flex flex-col md:flex-row text-center md:justify-between">
          <p className="text-sm leading-7 lg:leading-[27px]">
            &copy;&nbsp;Copyright {year}&nbsp;
            <a
              className={cn(
                "transition-colors duration-200 ease-in-out text-brand-light/70 hover:text-brand-light"
              )}
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; All rights reserved
          </p>

          {payment && (
            <ul className="flex flex-wrap justify-center items-center space-x-2">
              {payment?.map((item) => (
                <li
                  className="transition hover:opacity-80 inline-flex"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : "/#"}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      className="scale-85"
                      src={item.image}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
