import React from 'react';
import CompareCardDrawer from './compare-card-drawer';
import Container from "@/components/shared/container";
import Link from "next/link";
import {useCompare} from "@/hooks/use-compare";
import {useUI} from "@/hooks/use-UI";
import {ROUTES} from "@/utils/routes";
import {useModal} from "@/hooks/use-modal";

const CompareDrawer: React.FC = () => {
    const {compareList,removeFromCompare,clearCompare} = useCompare();
   
    const {closeDrawer} = useUI();
    const {closeModal} = useModal();
    return (
        <>
            {compareList.length > 0 && (
                <Container>
                    <div className=' flex justify-between text-black py-3'>
                        <div className="flex items-center text-sm">
                            Compare ({compareList.length})
                        </div>
                        <div className="text-sm flex items-center space-x-10">
                            <div className=" button">
                                <button onClick={clearCompare}>
                                    <span className="c-button__text ">Clear All</span>
                                </button>
                            </div>
                            <div className="c-cta button">
                                <Link href={ROUTES.COMPARE}
                                      onClick={()=>{
                                          closeDrawer();
                                          closeModal();
                                      }}
                                      className="block leading-6 px-4 py-1 bg-brand-dark hover:bg-brand-dark/90 rounded text-white text-sm font-medium items-center justify-center focus:outline-none focus-visible:outline-none"
                                >
                                    Compare
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-2 md:gap-5 mb-4">
                        {compareList.map((product) => (
                            <CompareCardDrawer
                                key={product.id}
                                product={product}
                                removeCompare={removeFromCompare}
                            />
                         ))}
                    </div>
                
                </Container>
            )}
        </>
    )
    
};

export default CompareDrawer;
