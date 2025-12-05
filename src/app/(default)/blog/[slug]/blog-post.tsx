'use client';
import React, {FC} from 'react';
import cn from 'classnames';
import {useBlogPostQuery} from '@/services/blog/get-blog-post';

import BlogPostCard from "@/components/blog/blog-post-card";
import Loading from "@/components/shared/loading";

interface blogGridProps {
  className?: string;
}

export const BlogPost: FC<blogGridProps> = ({ className }) => {

  const { data, isLoading } = useBlogPostQuery();
  if (isLoading) return <Loading/>;
    
  return (
      <div className={cn('blog-post w-full ', className)}>
          <BlogPostCard key={`blog--post`} blogData={data}  />
      </div>
   
  );
};
