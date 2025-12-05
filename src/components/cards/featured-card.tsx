import Heading from '@/components/shared/heading';
import cn from 'classnames';
import Text from '@/components/shared/text';

import React, { JSX } from 'react';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Props {
  className?: string;
  item: ItemProps;
  variant?: string;
}

const FeaturedCard: React.FC<Props> = ({ item, className, variant }) => {
  const { icon, title, description } = item;
  return (
	<div
	  className={cn(
		'group',
		{
		  'px-5 xl:px-5 2xl:px-6 flex items-center justify-center  border-black/10 ltr:border-r rtl:border-l': variant === 'default'|| variant === 'home4' || variant === 'home8' ,
		},
		className,
	  )}
	>
	  <div className="flex-shrink-0 items-center justify-center ">
		{icon}
	  </div>

	  {variant == 'home4' || variant == 'home8' ? (
		<div className="ps-4">
		  <Heading variant="base" className="sm:text-sm ">
			{title}
		  </Heading>
		  <Text className={'sm:text-sm lg:leading-[24px]'}>
			{description}
		  </Text>
		</div>
		 
	  )  : (
		<div className="ps-4">
		  <Heading
			variant="base"
			className="sm:text-base   font-bold"
		  >
			{title}
		  </Heading>
		  <Text
			variant="small"
			className="xs:leading-4 font-normal sm:text-sm"
		  >
			{description}
		  </Text>
		</div>
	  )}
	</div>
  );
};

export default FeaturedCard;
