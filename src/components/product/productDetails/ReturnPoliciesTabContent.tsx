interface ReturnPoliciesTabContentProps {
  data: any;
}

export default function ReturnPoliciesTabContent({
  data,
}: ReturnPoliciesTabContentProps) {
  return (
    <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5">
      <h3 className="text-brand-dark font-medium">Return Policy</h3>
      <p>
        We want you to be completely satisfied with your purchase. If you're not
        happy with your {data?.name}, you can return it within 30 days of
        receipt for a full refund or exchange.
      </p>
      <p>
        To be eligible for a return, your item must be unused and in the same
        condition that you received it. It must also be in the original
        packaging.
      </p>
      <h3 className="text-brand-dark font-medium">Shipping</h3>
      <p>
        We ship all orders within 1-2 business days. You will receive a tracking
        number once your order has shipped.
      </p>
    </div>
  );
}
