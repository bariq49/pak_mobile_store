import { Metadata } from "next";
import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import CategoriesPageContent from "@/app/(default)/categories/categories-page-content";

export const metadata: Metadata = {
  title: "Categories Page",
};
export default async function Page() {
  return (
    <Container>
      <div className="py-7 lg:py-8  blog-category">
        <Breadcrumb />
        <div className="pt-7 lg:pt-8">
          <CategoriesPageContent />
        </div>
      </div>
    </Container>
  );
}
