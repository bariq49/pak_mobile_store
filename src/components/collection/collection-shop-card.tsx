'use client';

import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import { LinkProps } from 'next/link';

import {categoryPlaceholder} from '@/assets/placeholders';
import cn from 'classnames';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";

interface Props {
    collection: any;
    href: LinkProps['href'];
    className?: string;
}

const CollectionShopCard: React.FC<Props> = ({
  collection,
  href,
  className,
}) => {
    const {name, image, productCount} = collection ?? {};
    const { selectedColor } = usePanel();
  return (
      <Link
          href={href}
          className={cn('group block w-full p-2 sm:p-4 bg-white', className)}
      >
          <div className="flex flex-col sm:flex-row items-center gap-1">
              <div className="category-info sm:max-w-[70%] flex-auto">
                  <h3 className={cn(colorMap?.[selectedColor]?.groupHoverLink,"text-brand-dark apitalize text-sm truncate leading-6 ")}>
                      {name}
                  </h3>
                  <p className={"text-[13px] text-gray-400"}>({productCount} items)</p>
              </div>
              <div className={`flex flex-shrink-0 group-hover:opacity-80`}>
                  <Image
                      src={image?.thumbnail ?? categoryPlaceholder}
                      alt={name || 'text-card-thumbnail'}
                      width={80}
                      height={80}
                  />
              </div>
          </div>
      </Link>
  );
};

export default CollectionShopCard;
