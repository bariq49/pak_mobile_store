'use client';

import Image from '@/components/shared/image';
import Link from '@/components/shared/link';


import {collectionPlaceholder} from '@/assets/placeholders';
import cn from "classnames";

import {Category} from "@/services/types";
import { ROUTES } from '@/utils/routes';

interface Props {
    category: Category;
    className?: string;
}

const CollectionFeaturedCard: React.FC<Props> = ({
                                                     category,
                                                     className
                                                 }) => {
    const {name,  image, children,slug} = category;
    const SUBCATEGORIES_LIMITS = 5;
    return (
        <div className={`wb-categories__items relative`}>
            <div className="wb-categories__img">
                <div
                    className={cn(
                        'group  justify-between items-center px-0 transition ',
                        className
                    )}
                >
                    <Image
                        src={image?.original2 ?? collectionPlaceholder}
                        alt={name || ('text-thumbnail')}
                        width={ 360}
                        height={445}
                        className=" transition duration-200 ease-in-out transform group-hover:opacity-80"
                    />
                
                </div>
            </div>
            
            
            <div className="wb-categories__info absolute">
                <h3 className={`wb-categories__info--heading text-[18px] text-brand-light uppercase  font-medium `}>
                    <Link href={`${ROUTES.CATEGORY}/${slug}`} >{name}</Link>
                </h3>
                
                {Array.isArray(children) ? (
                    <ul key="content" className="wb-categories__info--sublist py-3 text-[15px] leading-8">
                        {children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx: number) => {
                            return (
                                <li className="pb-1 text-brand-light" key={`${idx}`}>
                                    <Link
                                        className={"block"}
                                        href={`${ROUTES.CATEGORY}/${currentItem.slug}`}
                                    >
                                        {currentItem.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            
            </div>
        </div>
    );
};

export default CollectionFeaturedCard;
