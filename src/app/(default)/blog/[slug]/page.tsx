import Container from '@/components/shared/container';
import { Metadata } from 'next';
import Breadcrumb from "@/components/shared/breadcrumb";
import {BlogPost} from "./blog-post";
import React from "react";

export const metadata: Metadata = {
    title: 'Blog',
};

export default async function Page() {
  return (
      <>
        <Container>
          <div className="pt-7 lg:pt-10 pb-10 blog-category">
            <Breadcrumb  />
            <div className="m-auto">
              <BlogPost key={'blogPost'} className={`pt-8 pb-8`} />
            </div>
          </div>
        </Container>
      </>
    );
}
