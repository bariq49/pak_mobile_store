'use client'
import Heading from '@/components/shared/heading';
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";
import CartEmptyIcon from "@/components/icons/cart-empty-icon";

function EmptyCart() {
    return (
        <div className="flex flex-col h-2/3 items-center justify-center ">
            <div className="flex mx-auto  md:w-auto">
                <CartEmptyIcon className={"text-gray-400"}/>
            </div>
            <Heading variant="titleMedium" className="pt-8 pb-7">
                Your cart is empty.
            </Heading>
            <Link href={ROUTES.HOME} variant={"button-primary"} className={"min-w-50"}>
                Continue Shopping
            </Link>
        </div>
    );
}

export default EmptyCart;
