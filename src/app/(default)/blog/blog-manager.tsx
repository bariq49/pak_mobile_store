'use client';
import React from "react";
import {useBlogsQuery} from "@/services/blog/get-all-blogs";
import { BlogContent } from "./blog-content";
import Loading from "@/components/shared/loading";

export default function BlogManager({ variant }: { variant: string }) {
  const { data, isLoading } = useBlogsQuery();
  const dataBlog = data;

  const renderBlogContent = (variant: string) => {
    switch (variant) {
      case "grid":
        return <BlogContent dataBlog={dataBlog} countPerPage={9} />;
      default:
        return (
          <BlogContent
            dataBlog={dataBlog}
            className={`pt-10  xl:grid-cols-4`}
          />
        );
    }
  };

  if (isLoading) return <Loading />;

  return renderBlogContent(variant);
}
