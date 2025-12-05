'use client';

import BannerCard from '@/components/banner/banner-card';

interface BannerProps {
  data?: any;
  grid?: number;
  className?: string;
  girdClassName?: string;
  variant?: 'rounded' | 'default' | 'hero';
}


const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  girdClassName,
  className = 'mb-3 xl:mb-6',
  variant = 'default',
}) => {
  return (
    <div className={className}>
        <div
            className={`grid grid-cols-1  sm:grid-cols-${grid} gap-2 ${girdClassName ? girdClassName: 'md:gap-6 '}`}
        >
            {data?.map((banner: unknown,index:number) => (
                <BannerCard
                    key={`banner--key${index}`}
                    banner={banner}
                    effectActive={true}
                    className="w-full overflow-hidden"
                    variant={variant}
                />
            ))}
        </div>
    </div>
  );
};

export default BannerGrid;
