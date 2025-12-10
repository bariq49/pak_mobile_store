import { forwardRef } from "react";
import cn from "classnames";
import SearchForm from "@/components/top-search/search-form";
import { useSearchHandler } from "../../hooks/use-search-handler";
import SearchOverlay from "@/components/top-search/searchOverlay";
import SearchResults from "@/components/top-search/searchResults";
import useBodyScroll from "@/utils/use-body-scroll";

const Search = forwardRef<HTMLDivElement, any>(
  ({ className = "md:w-[710px]" }, ref) => {
    const {
      queryText,
      displayMobileSearch,
      displaySearch,
      isLoading,
      searchResults,
      inputFocus,
      handleSearch,
      handleAutoSearch,
      clear,
      enableInputFocus,
    } = useSearchHandler();

    useBodyScroll(inputFocus || displaySearch || displayMobileSearch);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full transition-all duration-200 ease-in-out",
          className
        )}
      >
        <SearchOverlay
          displayMobileSearch={displayMobileSearch}
          displaySearch={displaySearch}
          inputFocus={inputFocus}
          onClick={clear}
        />

        <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
          <div className="flex flex-col w-full mx-auto">
            <SearchForm
              value={queryText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={enableInputFocus}
            />
          </div>

          <SearchResults
            queryText={queryText}
            searchResults={searchResults}
            isLoading={isLoading}
            onClear={clear}
          />
        </div>
      </div>
    );
  }
);

Search.displayName = "Search";
export default Search;
