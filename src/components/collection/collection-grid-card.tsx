'use client';

import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import { LinkProps } from 'next/link';

import {categoryPlaceholder} from '@/assets/placeholders';
import cn from 'classnames';

import {ROUTES} from "@/utils/routes";

interface Props {
    collection: any;
    href: LinkProps['href'];
    className?: string;
}

const CollectionGridCard: React.FC<Props> = ({
  collection,
  href,
  className,
}) => {
    const {name, image, children} = collection ?? {};
    const SUBCATEGORIES_LIMITS = 5;
  return (
      <div className={cn('group block w-full ', className)}>
          <div className="flex rtl:flex-row-reverse">
              <div className="max-w-[60%] flex-auto rtl:text-right">
                  <h3 className={cn("text-brand-dark apitalize text-base capitalize  font-medium ")}>
                      <Link
                          className={"block"}
                          href={href}
                          title={name}
                      >
                      {name}
                      </Link>
                  </h3>
                  {Array.isArray(children) ? (
                      <ul key="content" className="py-3 text-sm leading-6">
                          {children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx: number) => {
                              return (
                                  <li className="pb-1" key={`${idx}`}>
                                      <Link
                                          className={"block"}
                                          href={`${ROUTES.CATEGORY}/${currentItem.slug}`}
                                          title={currentItem.title}
                                      >
                                          {currentItem.name}
                                      </Link>
                                  </li>
                              );
                          })}
                      </ul>
                  ) : null}
              </div>
              
              <div className={`max-w-[40%] flex-auto  group-hover:opacity-80`}>
                  <Image
                      src={image?.original3 ?? categoryPlaceholder}
                      alt={name || 'text-thumbnail'}
                      width={230}
                      height={280}
                  />
              </div>
          </div>
      </div>
  );
};

export default CollectionGridCard;
