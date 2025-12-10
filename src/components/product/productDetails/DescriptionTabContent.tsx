import Image from "@/components/shared/image";

interface DescriptionTabContentProps {
  data: any;
}

export default function DescriptionTabContent({
  data,
}: DescriptionTabContentProps) {
  return (
    <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-2">
      {/* Product Description */}
      {data?.description && (
        <>
          <h3 className="text-brand-dark font-medium">Description</h3>
          <p>{data?.description}</p>
        </>
      )}
      {/* Product Details */}
      {data?.product_details && (
        <>
          <h3 className="text-brand-dark font-medium">Product Details</h3>
          <p>{data?.product_details}</p>
        </>
      )}
    </div>
  );
}
