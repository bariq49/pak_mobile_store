"use client";
import Alert from "@/components/shared/alert";
import CategoryListCardLoader from "@/components/shared/loaders/category-list-card-loader";
import cn from "classnames";
import CategoryMenu from "@/components/shared/category-menu";
import { useCategories } from "@/services/category/get-all-categories";

interface CategoryDropdownProps {
  className?: string;
  categoriesLimit?: number;
}

export default function CategoryDropdownNav({
  className,
  categoriesLimit = 12,
}: CategoryDropdownProps) {
  const { data, isLoading, error } = useCategories({ limit: 6 });

  const noCategories = !isLoading && !error && (!data || data.length === 0);

  return (
    <div className={cn("absolute z-20 w-72 lg:w-full", className)}>
      <div className="max-h-full">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : isLoading ? (
          <div
            className={cn(
              "w-full bg-background border-t-0 border-2 rounded-b-md category-dropdown-menu"
            )}
          >
            {Array.from({ length: 8 }).map((_, idx) => (
              <CategoryListCardLoader
                key={`category-list-${idx}`}
                uniqueKey="category-list-card-loader"
              />
            ))}
          </div>
        ) : noCategories ? (
          <div className="w-full bg-background border-t-0 border-2 rounded-b-md p-4 text-center">
            <p className="text-brand-muted">No categories found</p>
          </div>
        ) : (
          <CategoryMenu items={data} categoriesLimit={categoriesLimit} />
        )}
      </div>
    </div>
  );
}
