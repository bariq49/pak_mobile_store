// SearchOverlay.tsx

import cn from 'classnames';

const SearchOverlay = ({ displayMobileSearch, displaySearch, inputFocus, onClick }: any) => (
    <div
        className={cn(
            'overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed ',
            {
                open: displayMobileSearch,
                'input-focus-overlay-open': inputFocus,
                'open-search-overlay': displaySearch,
            }
        )}
        onClick={onClick}
    />
);

export default SearchOverlay;
