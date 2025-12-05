'use client';
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";
import { useElectronicProductsQuery } from "@/services/product/get-all-electronic-products";
import { useListingTabs } from '../../../hooks/use-listing-tabs';
import Loading from "@/components/shared/loading";
import cn from "classnames";
import ListingBanner from './listing-ui/listingBanner';

const categories = {
    name: "Cellphones & Tablets",
    slug: "cellphones",
    children: [
        { id: 1, name: "Computer", slug: "computer" },
        { id: 2, name: "Electronic & Digital", slug: "digital" },
        { id: 3, name: "Groceries", slug: "groceries" },
        { id: 4, name: "Sport", slug: "sport" },
        { id: 5, name: "Smart Watch", slug: "lighting" },
    ],
};

const ListingCellPhone: React.FC<{ variant?: string; showBanner?: string; }> = ({ variant = 'default', showBanner }) => {
    const { activeTab, isPending, handleTabClick } = useListingTabs();
    const { data: products, isLoading } = useElectronicProductsQuery({});
    const bannerUrl = '/assets/images/collection/banner_cate_home7_1.jpg';

    return (
        <div className="mb-8 lg:mb-12">
            <ListingTabs variant={variant} data={categories} onNavClick={handleTabClick} activeTab={activeTab} />
            <div
                className={cn({
                    ['xl:flex border border-black/10 rounded bg-white']: variant === "outBorder",
                    ['flex-row-reverse']: showBanner === "right",
                })}
            >
                {showBanner && (
                    <ListingBanner
                        slug={categories.slug}
                        name={categories.name}
                        bannerUrl={bannerUrl}
                    />
                )}
                <div className={`${showBanner ? 'banner-listing-content md:p-2.5' : 'w-full md:p-2.5'}`}>
                    {isPending ? (
                        <Loading />
                    ) : (
                        <ProductListing
                            data={products}
                            isLoading={isLoading}
                            variant={variant}
                            uniqueKey={'cellphone'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingCellPhone;
