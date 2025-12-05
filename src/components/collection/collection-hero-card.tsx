'use client';

import Heading from '@/components/shared/heading';
import Text from "@/components/shared/text";
import BannerCard from "@/components/banner/banner-card";

interface Props {
    variant?: 'rounded' | 'default' | 'hero';
    collection: any;
    className?: string;
}

const CollectionHeroCard: React.FC<Props> = ({
                                             collection,
                                             variant = 'default',
                                             className
                                         }) => {
    const {title,description} = collection;
    
    
    return (
      <div
        className="flex flex-col justify-center overflow-hidden  group shadow-card relative"
      >
          <BannerCard
              banner={collection}
              effectActive={true}
              className="w-full overflow-hidden"
              variant={variant}
          />
          <div className="absolute top-0 p-5 lg:p-8 z-10">
              <Heading variant="mediumHeading" className="text-lg  pb-1 dark:text-white">
                  {title}
              </Heading>
              <Text className="xs:text-sm text-gray-400">{description}</Text>
          </div>
      </div>
    );
};

export default CollectionHeroCard;
