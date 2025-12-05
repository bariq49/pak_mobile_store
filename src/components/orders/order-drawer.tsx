import {OrderDetailsContent} from './order-details-content';
import {formatLocation} from '@/utils/format-location';
import Heading from '@/components/shared/heading';
import {IoClose} from 'react-icons/io5';
import OrderStatus from './order-status';
import {DeliveryFee, DiscountPrice, SubTotalPrice, TotalPrice,} from '@/components/orders/price';

import {useUI} from '@/hooks/use-UI';

const OrderDrawer: React.FC = () => {
    const {data, closeDrawer} = useUI();
    const {shipping_address} = data;
    
    return (
        <>
            {data !== '' && (
                <>
                    <div className="block">
                        <div
                            className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
                            <Heading variant="titleMedium">
                                Order details
                            </Heading>
                            <button
                                className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                                onClick={closeDrawer}
                                aria-label="close"
                            >
                                <IoClose/>
                            </button>
                        </div>
                        <div className="p-5 md:p-8">
                            <div className="text-[14px] opacity-70 mb-3 text-brand-dark">
                                Shipping Address
                            </div>
                            <div
                                className="rounded border border-solid min-h-[90px] bg-gray-100 p-4 border-border-two text-[12px] md:text-[14px]">
                                <p className="text-brand-dark opacity-70">
                                    {formatLocation(shipping_address)}
                                </p>
                            </div>
                            <OrderStatus status={data?.status?.serial}/>
                            <div
                                className="grid grid-cols-12 bg-gray-300 py-3 rounded-[3px] text-brand-dark text-[12px] md:text-[14px]">
                                <div className="col-span-2"></div>
                                <div className="col-span-5">Items Name</div>
                                <div className="col-span-3 text-center md:ltr:text-left md:rtl:text-right">
                                    Quantity
                                </div>
                                <div className="col-span-2">Price</div>
                            </div>
                            {data?.products?.map((item: any, index: string) => (
                                <OrderDetailsContent key={index} item={item}/>
                            ))}
                            <div className="mt-3 ltr:text-right rtl:text-left">
                                <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                                    <div className="pb-1 mb-2 border-b border-border-base ltr:pl-20 rtl:pr-20">
                                        <p className="flex justify-between mb-1">
                                            <span className="ltr:mr-8 rtl:ml-8">Sub total: </span>
                                            <span className="font-medium">
                        <SubTotalPrice items={data?.products}/>
                      </span>
                                        </p>
                                        {typeof data?.discount === 'number' && (
                                            <p className="flex justify-between mb-2">
                                                <span className="ltr:mr-8 rtl:ml-8">Discount: </span>
                                                <span className="font-medium">
                          <DiscountPrice discount={data?.discount}/>
                        </span>
                                            </p>
                                        )}
                                        {typeof data?.delivery_fee === 'number' && (
                                            <p className="flex justify-between mb-2">
                                                <span className="ltr:mr-8 rtl:ml-8">Delivery Fee:</span>
                                                <span className="font-medium">
                          <DeliveryFee delivery={data?.delivery_fee}/>
                        </span>
                                            </p>
                                        )}
                                    </div>
                                    <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
                                        <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
                                        <span className="font-medium">
                      <TotalPrice items={data}/>
                    </span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-12 ltr:text-right rtl:text-left">
                <span
                    className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-black font-medium bg-white rounded border border-solid border-[#DEE5EA] ltr:mr-4 rtl:ml-4   hover:border-[#333] transition-all capitalize">
                  Report order
                </span>
                                <span
                                    onClick={closeDrawer}
                                    className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-medium bg-[#333] rounded border border-solid border-[#333]  hover:bg-[#333]/90  transition-all capitalize"
                                >
                  Cancel order
                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderDrawer;
