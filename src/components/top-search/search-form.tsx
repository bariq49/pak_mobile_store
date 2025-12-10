import React from "react";
import cn from "classnames";
import SearchIcon from "@/components/icons/search-icon";
import CloseIcon from "@/components/icons/close-icon";

type SearchBoxProps = {
  className?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
};

const SearchForm = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, value, onSubmit, onClear, onFocus, ...rest }, ref) => {
    return (
      <form
        className={cn("flex w-full relative", className)}
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label className="flex flex-1 items-center py-0.5">
          <input
            className={cn(
              "text-body outline-none w-full h-[45px] rounded-full ltr:pl-5 md:ltr:pl-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 text-sm transition-all duration-200 focus:ring-0",
              "bg-fill-two text-brand-dark placeholder:text-brand-muted border border-border-one focus:border-primary-500"
            )}
            placeholder="Search the store"
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
            className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 transition duration-200 ease-in-out hover:text-primary-500 focus:outline-none"
          >
            <CloseIcon className="w-[17px] h-[17px] opacity-50" />
          </button>
        ) : (
          <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 text-brand-muted">
            <SearchIcon className="w-5 h-5 opacity-60" />
          </span>
        )}
      </form>
    );
  }
);

export default SearchForm;
