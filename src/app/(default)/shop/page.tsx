import { Metadata } from "next";
import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import React, { Suspense } from "react";
import Loading from "@/components/shared/loading";
import ShopPageContent from "./shop-page-content";

export const metadata: Metadata = {
  title: "Shop Page",
};
function SearchBarFallback() {
  return <Loading />;
}
export default async function Page() {
  return (
    <Container>
      <div className="py-7 lg:py-8  blog-category">
        <Breadcrumb />
        <Suspense fallback={<SearchBarFallback />}>
          <div className="pt-7 lg:pt-8">
            <ShopPageContent />
          </div>
        </Suspense>
      </div>
    </Container>
  );
}
