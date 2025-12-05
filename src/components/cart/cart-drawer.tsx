import Scrollbar from '@/components/shared/scrollbar';
import {useCart} from '@/hooks/use-cart';
import {useUI} from '@/hooks/use-UI';
import usePrice from '@/services/product/use-price';
import CartItemDrawer from './cart-item-drawer';
import EmptyCart from './empty-cart';
import Link from '@/components/shared/link';
import {ROUTES} from '@/utils/routes';
import Heading from '@/components/shared/heading';
import Text from '@/components/shared/text';
import {X} from "lucide-react";

export default function CartDrawer() {
    const {closeDrawer} = useUI();
    const {items, total, isEmpty} = useCart();
    const {price: cartTotal} = usePrice({
        amount: total,
        currencyCode: 'USD',
    });
    return (
        <div className="flex flex-col  w-full h-full px-5 md:px-8 pt-0">
            <div
                className=" relative flex items-center justify-between w-full border-b-2  border-neutral-200/70 dark:border-neutral-700/70 mb-2 md:mb-4">
                <Heading variant="titleMedium">Shopping cart</Heading>
                <div className="flex items-center">
                    <button
                        className="flex items-center justify-center text-3xl transition-opacity  py-4  lg:py-5 focus:outline-none text-brand-dark hover:opacity-60"
                        onClick={closeDrawer}
                        aria-label="close"
                    >
                        <X />
                    </button>
                </div>
            </div>
            
            {!isEmpty ? (
                    <>
                        <Scrollbar className="flex-grow w-full cart-scrollbar ">
                            <div className="w-full  h-[calc(100vh_-_300px)]">
                                {items?.map((item) => (
                                    <CartItemDrawer item={item} key={item.id}/>
                                ))}
                            </div>
                        </Scrollbar>
                        <div className="pt-5 pb-5 border-t-2 border-neutral-200/70 dark:border-neutral-700/70  md:pt-6 md:pb-6">
                            <div className="flex pb-5 md:pb-7">
                                <div className="ltr:pr-3 rtl:pl-3">
                                    <Heading className="mb-2.5 " variant={"title"}>Subtotal:</Heading>
                                    <Text className="leading-6">
                                        Taxes and shipping calculated at checkout
                                    </Text>
                                </div>
                                <div
                                    className="shrink-0 font-semibold text-base md:text-lg text-brand-dark -mt-0.5 min-w-[80px] ltr:text-right rtl:text-left">
                                    {cartTotal}
                                </div>
                            </div>
                            <div className="grid grid-col1 md:grid-cols-2 gap-5" onClick={closeDrawer}>
                                <Link
                                    href={ROUTES.CART}
                                    variant={"button-border"}
                                >
                                    <span className="py-0.5">View Cart</span>
                                </Link>
                                
                                <Link
                                    href={ROUTES.CHECKOUT}
                                    variant={"button-primary"}
                                >
                                    <span className="py-0.5">Check Out</span>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyCart/>
                )}
        
        
        </div>
    );
}
