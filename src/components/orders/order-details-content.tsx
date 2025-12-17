import usePrice from '@/services/product/use-price';
import Image from '@/components/shared/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const hasBackendDeal =
    typeof item?.originalPrice === 'number' &&
    item.originalPrice > 0 &&
    typeof item?.dealPrice === 'number' &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  const unitAmount = hasBackendDeal
    ? item.dealPrice as number
    : item.price;

  const { price } = usePrice({
    amount: unitAmount * (item.quantity ?? 1),
  });
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          src={item?.image?.thumbnail}
          alt={item?.name || 'Product Image'}
          width="60"
          height="60"
          className="object-cover"
        />
      </div>
      <div className="self-center col-span-5">
        <h2 className="text-brand-dark">{item.name}</h2>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right">
        {typeof item.quantity === 'number' && <p>{item.quantity} x</p>}
      </div>
      <div className="self-center col-span-2">
        <p>{price}</p>
      </div>
    </div>
  );
};
