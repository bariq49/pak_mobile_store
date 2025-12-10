"use client";

import React, { useEffect } from "react";
import Switch from "@/components/shared/switch";
import {
  CategoriesFilter,
  CategoryOption,
} from "@/components/filter/facets/categories-filter";
import { FilterSection } from "@/components/filter/facets/filter-section";
import { ColorsFilter } from "@/components/filter/facets/colors-filter";
import { SizesFilter } from "@/components/filter/facets/sizes-filter";
import { PriceRangeFilter } from "@/components/filter/facets/price-range-filter";

import { colorsData, sizesData } from "@/components/filter/data";
import { useFilters } from "@/hooks/use-filter-hooks";
import { useCategories } from "@/services/category/get-all-categories";

interface FiltersProps {
  departmentSlug?: string; // ✅ optional
}

// Transform API data to match component expectations
const transformCategories = (apiCategories: any[]): CategoryOption[] => {
  return apiCategories.map((category) => ({
    slug: category.slug,
    label: category.name,
    count: 0,
    subCategories: category.children
      ? category.children.map((child: any) => ({
          slug: child.slug,
          label: child.name,
          count: 0,
        }))
      : [],
  }));
};

const Filters = ({ departmentSlug }: FiltersProps) => {
  const {
    isOnSale,
    setIsOnSale,
    sectionsOpen,
    toggleSection,
    selectedFilters,
    handleFilterChange,
    priceRange,
    handlePriceRangeChange,
    expandedCategories,
    toggleCategoryExpand,
    MIN_PRICE,
    MAX_PRICE,
    clearCategories,
    clearPriceRange,
    clearColors,
    clearSizes,
  } = useFilters();
  const { data, isLoading, error } = useCategories({ limit: 50 });
  const departmentCategories = departmentSlug
    ? data?.filter((cat: any) => cat.slug === departmentSlug)
    : data;

  const transformedCategories = departmentCategories
    ? transformCategories(departmentCategories)
    : [];

  // 👇 Add this effect
  useEffect(() => {
    if (
      transformedCategories.length > 0 &&
      Object.keys(expandedCategories).length === 0
    ) {
      toggleCategoryExpand(transformedCategories[0].slug);
    }
  }, [transformedCategories, expandedCategories, toggleCategoryExpand]);
  return (
    <div className="rounded">
      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        isOpen={sectionsOpen.categories}
        onToggle={() => toggleSection("categories")}
        onClear={clearCategories}
      >
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Failed to load categories</p>
        ) : (
          <CategoriesFilter
            categories={transformedCategories}
            selectedCategories={selectedFilters.categories}
            expandedCategories={expandedCategories}
            onCategoryChange={(slug, checked) =>
              handleFilterChange("categories", slug, checked)
            }
            onCategoryExpand={toggleCategoryExpand}
          />
        )}
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price range"
        isOpen={sectionsOpen.price}
        onToggle={() => toggleSection("price")}
        onClear={clearPriceRange}
      >
        <PriceRangeFilter
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
      </FilterSection>

      {/* On Sale */}
      <div className="pb-8 pr-2">
        <div className="flex justify-between items-center space-x-2">
          <div>
            <label className="text-base font-medium text-neutral-900 dark:text-neutral-200">
              On sale!
            </label>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Products currently on sale
            </p>
          </div>
          <label className="relative inline-block cursor-pointer switch">
            <Switch checked={isOnSale} onChange={setIsOnSale} />
          </label>
        </div>
      </div>

      {/* Colors */}
      {/* <FilterSection
        title="Colors"
        isOpen={sectionsOpen.colors}
        onToggle={() => toggleSection("colors")}
        onClear={clearColors}
      >
        <ColorsFilter
          colors={colorsData}
          selectedColors={selectedFilters.colors}
          onColorChange={(id, checked) =>
            handleFilterChange("colors", id, checked)
          }
        />
      </FilterSection> */}

      {/* Sizes */}
      {/* <FilterSection
        title="Size"
        isOpen={sectionsOpen.sizes}
        onToggle={() => toggleSection("sizes")}
        onClear={clearSizes}
      >
        <SizesFilter
          sizes={sizesData}
          selectedSizes={selectedFilters.sizes}
          onSizeChange={(id, checked) =>
            handleFilterChange("sizes", id, checked)
          }
        />
      </FilterSection> */}
    </div>
  );
};

export default Filters;
