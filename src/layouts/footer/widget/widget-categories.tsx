"use client";
import Heading from "@/components/shared/heading";
import Link from "@/components/shared/link";
import cn from "classnames";
import { useCategories } from "@/services/category/get-all-categories";
import { ROUTES } from "@/utils/routes";
import Loading from "@/components/shared/loading";

interface Props {
  className?: string;
}

const WidgetCategories: React.FC<Props> = ({ className }) => {
  const { data: categories, isLoading } = useCategories();

  // Filter to show only parent categories (top-level categories)
  // Parent categories are those returned directly from the API (not nested in children)
  // The API returns parent categories at the root level, and their children are in the children array
  const parentCategories = categories || [];

  // Limit to first 6-8 categories for footer display
  const displayCategories = parentCategories.slice(0, 8);

  if (isLoading) {
    return (
      <div className={cn("text-fill-footer", className)}>
        <Heading
          variant="mediumHeading"
          className={cn("text-brand-light mb-4 lg:mb-5")}
        >
          Categories
        </Heading>
        <Loading />
      </div>
    );
  }

  if (!displayCategories || displayCategories.length === 0) {
    return null;
  }

  return (
    <div className={cn("text-fill-footer", className)}>
      <Heading
        variant="mediumHeading"
        className={cn("text-brand-light mb-4 lg:mb-5")}
      >
        Categories
      </Heading>
      <ul className="text-sm lg:text-14px flex flex-col space-y-1">
        {displayCategories.map((category) => (
          <li key={`footer-category-${category.id}`}>
            <Link
              href={`/department/${category.slug}`}
              className={cn(
                "leading-7 transition-colors duration-200 block text-brand-light/80 hover:text-brand-muted"
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetCategories;

