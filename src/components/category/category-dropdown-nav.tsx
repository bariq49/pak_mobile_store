"use client";
import Alert from '@/components/shared/alert';
import CategoryListCardLoader from '@/components/shared/loaders/category-list-card-loader';
import {useCategoriesQuery} from '@/services/category/get-all-categories';
import cn from 'classnames';
import CategoryMenu from '@/components/shared/category-menu';
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/hooks/use-panel";

interface CategoryDropdownProps {
    className?: string;
    categoriesLimit?: number;
}

export default function CategoryDropdownNav({
         className,
         categoriesLimit = 12,
     }: CategoryDropdownProps) {
    const {
        data : categories,
        isLoading: loading,
        error,
    } = useCategoriesQuery({
        limit: 9,
    });
    const { selectedColor } = usePanel();
    return (
        <div className={cn('absolute z-20 w-72 lg:w-full', className)}>
            <div className="max-h-full">
                {error ? (
                    <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
                        <Alert message={error.message}/>
                    </div>
                ) : loading ? (
                    
                    <div className={cn('w-full bg-white border-t-0 border-2  rounded-b-md category-dropdown-menu',colorMap[selectedColor].border )} >
                        {Array.from({length: 8}).map((_, idx) => (
                            <CategoryListCardLoader
                                key={`category-list-${idx}`}
                                uniqueKey="category-list-card-loader"
                            />
                        ))}
                    </div>
                ) : (
                    <CategoryMenu
                        items={categories}
                        categoriesLimit={categoriesLimit}
                    />
                )}
            </div>
        </div>
    );
}
