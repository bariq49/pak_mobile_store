"use client";

import React from "react";
import Switch from "@/components/shared/switch";
import {CategoriesFilter} from "@/components/filter/facets/categories-filter";
import {FilterSection} from "@/components/filter/facets/filter-section";
import {ColorsFilter} from "@/components/filter/facets/colors-filter";

// Sample data
import {
    categoriesData,
    colorsData,
    sizesData
} from "@/components/filter/data";
import {SizesFilter} from "@/components/filter/facets/sizes-filter";
import {PriceRangeFilter} from "@/components/filter/facets/price-range-filter";
import {useFilters} from "@/hooks/use-filter-hooks";


const Filters = () => {
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
    } = useFilters();


    return (
        <div className="rounded ">
            {/* Categories Filter */}
            <FilterSection title="Categories" isOpen={sectionsOpen.categories}
                           onToggle={() => toggleSection("categories")}>
                <CategoriesFilter
                    categories={categoriesData}
                    selectedCategories={selectedFilters.categories}
                    expandedCategories={expandedCategories}
                    onCategoryChange={(id, checked) => handleFilterChange("categories", id, checked)}
                    onCategoryExpand={toggleCategoryExpand}
                />
            </FilterSection>
            
            {/* Price Range Filter */}
            <FilterSection title="Price range" isOpen={sectionsOpen.price} onToggle={() => toggleSection("price")}>
                <PriceRangeFilter min={MIN_PRICE} max={MAX_PRICE} value={priceRange} onChange={handlePriceRangeChange}/>
            </FilterSection>
            
            {/* Colors Filter */}
            <FilterSection title="Colors" isOpen={sectionsOpen.colors} onToggle={() => toggleSection("colors")}>
                <ColorsFilter
                    colors={colorsData}
                    selectedColors={selectedFilters.colors}
                    onColorChange={(id, checked) => handleFilterChange("colors", id, checked)}
                />
            </FilterSection>
            
            {/* Sizes Filter */}
            <FilterSection title="Size" isOpen={sectionsOpen.sizes} onToggle={() => toggleSection("sizes")}>
                <SizesFilter
                    sizes={sizesData}
                    selectedSizes={selectedFilters.sizes}
                    onSizeChange={(id, checked) => handleFilterChange("sizes", id, checked)}
                />
            </FilterSection>
            
            <div className="pb-8 pr-2">
                <div className="flex justify-between items-center space-x-2">
                    <div>
                        <label
                            className="text-base font-medium text-neutral-900 dark:text-neutral-200 "
                        >On sale!</label>
                        <p className="text-neutral-500 dark:text-neutral-400  text-sm">
                            Products currently on sale
                        </p>
                    </div>
                    <label className="relative inline-block cursor-pointer switch">
                        <Switch checked={isOnSale} onChange={setIsOnSale} />
                    </label>
                
                </div>
            </div>
        </div>
    );
};

export default Filters;
