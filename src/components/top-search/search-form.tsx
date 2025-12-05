import React from 'react';
import cn from 'classnames';
import SearchIcon from '@/components/icons/search-icon';
import CloseIcon from '@/components/icons/close-icon';


type SearchBoxProps = {
  className?: string;
  searchId?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  variant?: 'border'| 'dark'| 'fill';
};

const SearchForm = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      className,
      searchId = 'search',
      variant = 'border',
      value,
      onSubmit,
      onClear,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    return (
      <form
        className="flex w-full relative "
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor={searchId} className="flex flex-1 items-center py-0.5">
          <input
            id={searchId}
            className={cn(
              'text-heading outline-none w-full h-[45px] ltr:pl-5 md:ltr:pl-6  ltr:pr-14 rtl:pl-14 md:ltr:pr-16   text-brand-dark dark:text-white text-sm rounded-full transition-all duration-200  focus:ring-0 placeholder:text-brand-dark/50 dark:placeholder:text-white/50',
              {
                'border-2   bg-brand-light dark:bg-gray-800 border-black/10 dark:border-white/10  focus:border-black/50 focus:ring-0 ': variant === 'border',
                'bg-brand-light border-2 border-black/10  dark:border-white/15 focus:border-black/50 ': variant === 'dark',
                  'bg-gray-100 border-0 focus:border-black/50 ': variant === 'fill',
                
              }
            )}
            placeholder={'Search the store'}
            aria-label={searchId}
            autoComplete="off"
            value={value}
            onFocus={onFocus}
            ref={ref}
            {...rest}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={onClear}
            title="Clear search"
            className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none dark:text-white"
          >
            <CloseIcon className="w-[17px] h-[17px]  opacity-40" />
          </button>
        ) : (
          <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none dark:text-white">
            <SearchIcon className="w-5 h-5  opacity-40" />
          </span>
        )}
      </form>
    );
  },
);

export default SearchForm;


