'use client'
import Link from '@/components/shared/link';
import Image from '@/components/shared/image';
import { useCart } from '@/hooks/use-cart';
import usePrice from '@/services/product/use-price';
import {ROUTES} from '@/utils/routes';
import Counter from '@/components/shared/counter';
import {Item} from "@/services/utils/cartUtils";

type CartItemProps = {
    item: Item;
};

const CartItemDrawer: React.FC<CartItemProps> = ({item}) => {
    
    const {
        addItemWithQuantity,
        removeItemOrQuantity,
        removeItem,
        useCartHelpers
    } = useCart();

    const {price: totalPrice} = usePrice({
        amount: item?.itemTotal,
        currencyCode: 'USD',
    });
    const { isInStock, isInCart } = useCartHelpers(); // Get helpers
    const outOfStock = isInCart(item?.id) && !isInStock(item.id);
    return (
        <div
            className={`group w-full flex border-b border-neutral-100 dark:border-neutral-700/70 py-4 md:py-5 relative last:border-b-0`}
        >
            <div
                className="relative flex rounded overflow-hidden shrink-0  w-[80px] ">
                <Link
                    href={`/${ROUTES.PRODUCT}/${item?.slug}`}
                    className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
                >
                    <Image
                        src={item?.image}
                        width={80}
                        height={80}
                        alt={item.name || 'Product Image'}
                        className="object-cover bg-fill-thumbnail"
                    />
                </Link>
            </div>
            
            <div className="flex items-start justify-between w-full overflow-hidden">
                <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-5 md:rtl:pr-5">
                    <Link
                         href={{pathname:`${ROUTES.PRODUCT}/${item?.slug}`}}
                        className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px"
                    >
                        {item?.name}
                    </Link>
                    <div className="text-sm font-semibold text-brand-dark mt-2 block mb-2">
                        {totalPrice}
                    </div>
                    
                    <div className={"flex gap-2 md:gap-4 items-center"}>
                        <Counter
                            value={item.quantity}
                            onIncrement={() => addItemWithQuantity(item, 1)}
                            onDecrement={() => removeItemOrQuantity(item.id)}
                            variant="cart"
                            disabled={outOfStock}
                        />
                        
                        <div
                            onClick={() => removeItem(item.id)}
                            className=" transition-all text-gray-500 text-13px underline cursor-pointer"
                        >
                            Remove
                        </div>
                    </div>
                    
                  
                </div>
            
            
            </div>
        </div>
    );
};

export default CartItemDrawer;
