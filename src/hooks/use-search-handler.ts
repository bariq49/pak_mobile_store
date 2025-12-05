import { useState } from 'react';
import { useSearchQuery } from '@/services/product/use-search';
import {useUI} from '@/hooks/use-UI';
import {useRouter} from "next/navigation";
import { ROUTES } from '@/utils/routes';

export const useSearchHandler = () => {
    const router = useRouter();
    const {
        displayMobileSearch,
        closeMobileSearch,
        displaySearch,
        closeSearch,
    } = useUI();
    const [queryText, setQueryText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    const { data: searchResults, isLoading } = useSearchQuery({
        text: queryText,
    });

    function handleSearch(e: React.SyntheticEvent) {
        e.preventDefault();
        clear();
        const route = `${ROUTES.SEARCH}?q=${queryText}`;
        router.push(route);
    }

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
        setQueryText(e.currentTarget.value);
    }

    function clear() {
        setQueryText('');
        setInputFocus(false);
        closeMobileSearch();
        closeSearch();
    }

    function enableInputFocus() {
        setInputFocus(true);
    }

    return {
        queryText,
        setQueryText,
        inputFocus,
        setInputFocus,
        displayMobileSearch,
        displaySearch,
        searchResults,
        isLoading,
        handleSearch,
        handleAutoSearch,
        clear,
        enableInputFocus,
    };
};
