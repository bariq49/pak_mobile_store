import Container from '@/components/shared/container';
import { Metadata } from 'next';
import Breadcrumb from "@/components/shared/breadcrumb";
import React from "react";
import BlogManager from "../blog-manager";

export const metadata: Metadata = {
    title: 'Blog',
};

export default async function Page() {
    return (
        <Container>
            <div className="pt-7 lg:pt-10 pb-16 lg:pb-20 blog-category">
                <Breadcrumb/>
                <div className="max-w-screen-lg m-auto">
                    <BlogManager variant={'big'}/>
                </div>
            </div>
        </Container>
    );
}
