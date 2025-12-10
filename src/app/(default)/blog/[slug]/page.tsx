import Container from "@/components/shared/container";
import { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";
import { BlogPost } from "../[slug]/blog-post";
import React from "react";
import { BlogSidebar } from "../blog-sidebar";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Page() {
  return (
    <>
      <Container>
        <div className="pt-7 lg:pt-10 pb-10 blog-category">
          <Breadcrumb />
          <div className="flex pt-5 lg:pt-10 pb-6 lg:pb-6">
            <div className="flex-shrink-0 pe-7 xl:pe-8 hidden lg:block w-80  sticky top-16 h-full">
              <BlogSidebar />
            </div>
            <div className="w-full ">
              <BlogPost key={"blogPost"} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
