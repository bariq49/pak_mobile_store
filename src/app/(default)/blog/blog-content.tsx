'use client';

import {FC} from 'react';
import BlogCard from '@/components/blog/blog-card';
import cn from 'classnames';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import {Blog} from "@/services/types";
import {useBlogPagination} from "@/hooks/use-blog-pagination";

interface blogGridProps {
    dataBlog?: Blog[]; // Adjust based on your actual data structure
    className?: string;
    countPerPage?: number;
}

export const BlogContent: FC<blogGridProps> = ({dataBlog, className,countPerPage=8}) => {
    const { currentPage, filterData:blogs, updatePage } = useBlogPagination({
        dataBlog,
        countPerPage: countPerPage,
    });
    
    return (
        <>
            <div
                className={cn(
                    className,
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 md:gap-6'
                )}
                >
                {blogs?.map((item: Blog) => {
                      return <BlogCard key={`blog--key-${item.id}`} blog={item}/>;
                   })
                }

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

