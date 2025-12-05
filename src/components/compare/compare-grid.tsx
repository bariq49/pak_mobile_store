"use client";
import React from 'react';
import {useCompare} from "@/hooks/use-compare";
import Link from "@/components/shared/link";
import CompareCard from "@/components/compare/compare-card";
import {ROUTES} from "@/utils/routes";
import { useIsMounted } from '@/utils/use-is-mounted';
import Loading from "@/components/shared/loading";

const CompareGrid: React.FC = () => {
    const {compareList,removeFromCompare} = useCompare();

    const mounted = useIsMounted();
    if (!mounted) return <Loading/>;
    
    if (!compareList.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 lg:py-30 bg-white rounded-md">
                <h2 className="text-2xl md:text-3xl  font-semibold text-brand-dark">No products to compare</h2>
                <p className="text-15px md:text-base leading-6  pt-3 pb-7">
                    You haven&#39;t added any products to compare yet.
                </p>
                <Link href={ROUTES.HOME} variant={"button-primary"} className={"min-w-60"}>
                    Continue shopping
                </Link>
            </div>
        )
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {compareList?.map((product) => (
                <CompareCard key={product.id} product={product} removeCompare={removeFromCompare}/>
            ))}
        </div>
    );
};

export default CompareGrid;
