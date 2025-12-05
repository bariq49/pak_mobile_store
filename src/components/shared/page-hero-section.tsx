'use client';

import Breadcrumb from '@/components/shared/breadcrumb';
import cn from 'classnames';

interface HeaderProps {
  heroTitle?: string;
  variant?: 'default' | 'white';
  className?: string;
}

const PageHeroSection: React.FC<HeaderProps> = ({
  heroTitle = 'text-page-title',
  variant = 'default',
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex justify-center min-h-[150px] lg:min-h-[200px] w-full bg-slate-200/50  page-header-banner',
        {
          'style-variant-white': variant === 'white',
        },
        className
      )}

    >
      <div className="relative flex flex-col items-center justify-center w-full">
        <h2
          className={cn(
            'text-xl md:text-2xl lg:text-3xl 2xl:text-[32px] font-semibold text-center',
            {
              'text-brand-dark': variant === 'default',
              'text-brand-light': variant === 'white',
            }
          )}
        >
          <span className="block mb-2 font-semibold md:mb-4 ">
            {heroTitle}
          </span>
        </h2>
        <Breadcrumb />
      </div>
    </div>
  );
};

export default PageHeroSection;
