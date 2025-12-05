// SearchResults.tsx

import Scrollbar from '@/components/shared/scrollbar';
import SearchCard from '@/components/top-search/search-card';
import SearchResultLoader from '@/components/shared/loaders/search-result-loader';

const SearchResults = ({ queryText, searchResults, isLoading, onClear }: any) => {
    if (queryText.length <= 2) return null;

    return (
        <div className="w-full absolute top-[50px] ltr:left-0 rtl:right-0 bg-white rounded-md overflow-hidden drop-shadow-dropDown z-10">
            <Scrollbar>
                <div className="w-full max-h-[384px]">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={`search-form-loader-key-${idx}`}
                                className="py-3 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10"
                            >
                                <SearchResultLoader
                                    key={idx}
                                    uniqueKey={`search-form-${idx}`}
                                />
                            </div>
                        ))
                    ) : !searchResults || searchResults.length === 0 ? (
                        <div className="text-lg py-20 min-h-60 text-center">
                            Not found! Try with another keyword.
                        </div>
                    ) : (
                        searchResults.map((item: any, index: number) => (
                            <div
                                key={`search-form-key-${index}`}
                                className="py-3 ps-4 pe-10 border-b border-black/5 hover:bg-gray-100"
                                onClick={onClear}
                            >
                                <SearchCard product={item} key={index} />
                            </div>
                        ))
                    )}
                </div>
            </Scrollbar>
        </div>
    );
};

export default SearchResults;
