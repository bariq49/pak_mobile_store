import { Checkbox } from "@/components/shared/form/checkbox";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface CategoryOption {
  slug: string;
  label: string;
  count: number;
  subCategories?: CategoryOption[];
}

interface CategoriesFilterProps {
  categories: CategoryOption[];
  selectedCategories: Record<string, boolean>;
  expandedCategories?: Record<string, boolean>;
  onCategoryChange: (slug: string, checked: boolean) => void;
  onCategoryExpand?: (slug: string) => void;
}

export function CategoriesFilter({
  categories,
  selectedCategories,
  expandedCategories,
  onCategoryChange,
  onCategoryExpand,
}: CategoriesFilterProps) {
  const { selectedColor } = usePanel();

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isParentChecked = selectedCategories[category.slug] || false;

        return (
          <div key={category.slug} className="space-y-2">
            {/* Parent */}
            <div className="flex items-start justify-center">
              <Checkbox
                id={`category-${category.slug}`}
                checked={isParentChecked}
                onCheckedChange={(checked) => {
                  Object.keys(selectedCategories).forEach((slug) => {
                    if (slug !== category.slug) {
                      onCategoryChange(slug, false);
                    }
                  });
                  onCategoryChange(category.slug, checked);
                  if (!checked && category.subCategories) {
                    category.subCategories.forEach((sub) =>
                      onCategoryChange(sub.slug, false)
                    );
                  }
                }}
              />

              <div className="ps-2.5 flex-1 flex items-center justify-between">
                <label
                  htmlFor={`category-${category.slug}`}
                  className="text-sm leading-none cursor-pointer group"
                >
                  <span className={`${colorMap[selectedColor].groupHoverLink}`}>
                    {category.label}
                  </span>
                  {category.count > 0 && (
                    <span className="text-gray-500"> ({category.count})</span>
                  )}
                </label>

                {onCategoryExpand &&
                  category.subCategories &&
                  category.subCategories.length > 0 && (
                    <button
                      onClick={() => onCategoryExpand(category.slug)}
                      className="h-4 w-4 flex items-center justify-center"
                    >
                      {expandedCategories &&
                      expandedCategories[category.slug] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  )}
              </div>
            </div>

            {/* Children */}
            {category.subCategories &&
              expandedCategories &&
              expandedCategories[category.slug] && (
                <div className="ml-6 my-5 space-y-4">
                  {category.subCategories.map((subCategory) => {
                    const isChildChecked =
                      selectedCategories[subCategory.slug] || false;

                    return (
                      <div key={subCategory.slug} className="flex items-start">
                        <Checkbox
                          id={`category-${subCategory.slug}`}
                          checked={isChildChecked}
                          onCheckedChange={(checked) => {
                            Object.keys(selectedCategories).forEach((slug) => {
                              if (
                                slug !== subCategory.slug &&
                                slug !== category.slug
                              ) {
                                onCategoryChange(slug, false);
                              }
                            });
                            if (checked) {
                              onCategoryChange(category.slug, true);
                            }

                            onCategoryChange(subCategory.slug, checked);
                          }}
                        />
                        <label
                          htmlFor={`category-${subCategory.slug}`}
                          className="ps-2.5 text-sm leading-none cursor-pointer group"
                        >
                          <span
                            className={`text-slate-900 dark:text-slate-100 ${colorMap[selectedColor].groupHoverLink}`}
                          >
                            {subCategory.label}
                          </span>
                          {subCategory.count > 0 && (
                            <span className="text-gray-500">
                              {" "}
                              ({subCategory.count})
                            </span>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}
