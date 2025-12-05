'use client';

import {FC, useEffect} from 'react';
import cn from 'classnames';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import {useState} from "react";
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";
import Image from "@/components/shared/image";
import {productPlaceholder} from "@/assets/placeholders";
import {Category} from "@/services/types";

interface blogGridProps {
    categories?: Category[];
    className?: string;
}

export const CategoriesContainer: FC<blogGridProps> = ({categories, className = ''}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const countPerPage = 8;
    //const useCategories = categories?.slice(0, countPerPage);
    const [filterData, setFilterData] = useState<Category[]>([]);
    
    // Sync filterData when data or currentPage changes
    useEffect(() => {
        if (Array.isArray(categories) && categories.length > 0) {
            const to = countPerPage * currentPage;
            const from = to - countPerPage;
            setFilterData(categories.slice(from, to));
        } else {
            setFilterData([]); // Fallback to empty array if no data
        }
    }, [categories, currentPage, countPerPage]);
    
    const updatePage = (p: number) => {
        setCurrentPage(p);
    };
    
    return (
        <>
            <div
                className={cn(
                    className,
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
                )}
                >
                {filterData?.map((category: any) => {
                    const {id,name, image, slug} = category ?? {};
                    return (
                        <article
                            key={`categories--key-${id}`}
                            className={cn(
                                'flex flex-col bg-white rounded-md p-4 md:p-5 product-card overflow-hidden text-center',
                                className
                            )}
                        >
                            <div className="relative flex justify-center">
                                <Link
                                    href={`${ROUTES.CATEGORY}/${slug}`}
                                    className="relative block "
                                >
                                    <div className="flex overflow-hidden   relative z-2">
                                        <Image
                                            src={image?.original ?? productPlaceholder}
                                            alt={name || 'Product Image'}
                                            width={340}
                                            height={210}
                                            className="rounded duration-2000 ease-in-expo hover:scale-109"
                                        />
                                    </div>
                                </Link>
                                
                            </div>
                            <Link
                                href={`${ROUTES.CATEGORY}/${slug}`}
                                className={"pt-4  z-10 font-medium leading-5 lg:text-base"}>
                                {name}
                            </Link>
                        </article>
                    );
                })
                }
            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={categories?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                className="blog-pagination bg-white rounded xs:mt-2"
            />
        </>
    );
};

