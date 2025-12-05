'use client';
import {FC, useEffect} from 'react';
import cn from 'classnames';
import BlogCardList from '@/components/blog/blog-card-list';
import {useState} from "react";
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import {Blog} from "@/services/types";
import {useBlogPagination} from "@/hooks/use-blog-pagination";

interface blogGridProps {
    dataBlog?: Blog[]; // Adjust based on your actual data structure
    className?: string;
}

export const BlogListContent: FC<blogGridProps> = ({dataBlog, className = ''}) => {

    const countPerPage = 5;
    const { currentPage, filterData:blogs, updatePage } = useBlogPagination({
        dataBlog,
        countPerPage: countPerPage,
    });

    return (
        <>
            <div
                className={cn(
                    'grid grid-cols-1 gap-2 md:gap-7 ',
                    className
                )}
                >
                {blogs?.map((item: Blog) => {
                    return <BlogCardList key={`blog--key-${item.id}`} blog={item} />;
                     })
                }

                {/* end of error state */}
            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={dataBlog?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                className="blog-pagination bg-white rounded xs:mt-2"
            />
        </>
    );
};
