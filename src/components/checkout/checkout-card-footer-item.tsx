type FooterItemProps = {
	id: number;
	name: string;
	price: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
	                                                                            item,
                                                                            }) => {
	return (
		<div className="flex items-center w-full   text-brand-dark">
	          <span className={` ${item.name == 'Order total' && 'font-bold'}`}>
	            {item.name}
	        </span>
			<span
				className={` ltr:ml-auto rtl:mr-auto shrink-0  text-brand-dark ${item.name == 'Order total' ? 'text-2xl font-bold' : 'font-medium'}`}>
        {item.price}
      </span>
		</div>
	);
};
