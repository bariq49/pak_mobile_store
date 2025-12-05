import { useState, useMemo } from 'react';
import { Blog } from '@/services/types';

interface UseBlogPaginationProps {
    dataBlog?: Blog[];
    countPerPage?: number;
}

interface UseBlogPaginationReturn {
    currentPage: number;
    filterData: Blog[];
    updatePage: (page: number) => void;
}

export const useBlogPagination = ({
                                      dataBlog = [],
                                      countPerPage = 8,
                                  }: UseBlogPaginationProps): UseBlogPaginationReturn => {
    const [currentPage, setCurrentPage] = useState(1);

    const filterData = useMemo(() => {
        if (dataBlog) {
            const to = countPerPage * currentPage;
            const from = to - countPerPage;
            return dataBlog.slice(from, to) || [];
        }
        return [];
    }, [dataBlog, currentPage, countPerPage]);

    const updatePage = (page: number) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        filterData,
        updatePage,
    };
};